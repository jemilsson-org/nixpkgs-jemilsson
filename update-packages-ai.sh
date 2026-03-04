#!/usr/bin/env nix-shell
#!nix-shell -I nixpkgs=channel:nixpkgs-unstable -i bash -p bash curl jq nix-prefetch-github goose
set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
LOG_FILE="update-packages.log"
UPDATES_FILE="updates.txt"
FAILED_FILE="failed-updates.txt"
USE_LLM_FIXES=${USE_LLM_FIXES:-true}
GOOSE_PROVIDER=${GOOSE_PROVIDER:-venice}
GOOSE_MODEL=${GOOSE_MODEL:-zai-org-glm-5}

# Statistics
total_checked=0
total_updated=0
total_failed=0
total_llm_fixed=0

# Initialize log files
echo "=== Package Update Run $(date) ===" > "$LOG_FILE"
rm -f "$UPDATES_FILE" "$FAILED_FILE"
touch "$UPDATES_FILE" "$FAILED_FILE"

log() {
    echo -e "${2:-$NC}$1${NC}" | tee -a "$LOG_FILE"
}

log_info() {
    log "[INFO] $1" "$BLUE"
}

log_success() {
    log "[SUCCESS] $1" "$GREEN"
}

log_warn() {
    log "[WARN] $1" "$YELLOW"
}

log_error() {
    log "[ERROR] $1" "$RED"
}

# Check for required dependencies
check_dependencies() {
    local missing=()

    if ! command -v curl &> /dev/null; then
        missing+=("curl")
    fi
    if ! command -v jq &> /dev/null; then
        missing+=("jq")
    fi
    if ! command -v nix &> /dev/null; then
        missing+=("nix")
    fi

    if [ ${#missing[@]} -gt 0 ]; then
        log_error "Missing required dependencies: ${missing[*]}"
        log_error "Run with nix-shell or ensure dependencies are installed"
        return 1
    fi

    # Check GitHub API rate limit
    local rate_limit_json

    # Use GitHub token if available
    if [ -n "${GITHUB_TOKEN:-}" ]; then
        log_info "Using authenticated GitHub API (higher rate limits)"
        rate_limit_json=$(curl -sf -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/rate_limit" 2>/dev/null || echo "")
    else
        rate_limit_json=$(curl -sf "https://api.github.com/rate_limit" 2>/dev/null || echo "")
    fi
    if [ -n "$rate_limit_json" ]; then
        local remaining
        remaining=$(echo "$rate_limit_json" | jq -r '.rate.remaining' 2>/dev/null || echo "unknown")
        local reset
        reset=$(echo "$rate_limit_json" | jq -r '.rate.reset' 2>/dev/null || echo "unknown")

        if [ "$remaining" = "0" ]; then
            log_warn "GitHub API rate limit exhausted (0 remaining)"
            if [ "$reset" != "unknown" ]; then
                local reset_time
                reset_time=$(date -d "@$reset" 2>/dev/null || echo "unknown")
                log_warn "Rate limit resets at: $reset_time"
            fi
            log_warn "Updates may fail until rate limit resets"
        else
            log_info "GitHub API rate limit: $remaining remaining"
        fi
    fi

    return 0
}

# Function to check if a package needs updating
check_for_updates() {
    local pkg_dir="$1"
    local pkg_name=$(basename "$pkg_dir")

    if [ ! -f "$pkg_dir/default.nix" ]; then
        return 1
    fi

    # Extract current version (supports both double and single quotes)
    local current_version=""
    current_version=$(grep -Po '(?<=version = ")[^"]+' "$pkg_dir/default.nix" 2>/dev/null || true)
    if [ -z "$current_version" ]; then
        current_version=$(grep -Po "(?<=version = ')[^']+" "$pkg_dir/default.nix" 2>/dev/null || echo "")
    fi

    if [ -z "$current_version" ]; then
        log_warn "$pkg_name: Could not extract version"
        return 1
    fi

    log_info "$pkg_name: Current version $current_version"

    # Check for GitHub sources
    if ! grep -q "fetchFromGitHub" "$pkg_dir/default.nix"; then
        log_warn "$pkg_name: Not a GitHub source, skipping"
        return 1
    fi

    # Extract owner and repo
    local owner repo
    owner=$(grep -Po '(?<=owner = ")[^"]+' "$pkg_dir/default.nix" 2>/dev/null | head -1)
    repo=$(grep -Po '(?<=repo = ")[^"]+' "$pkg_dir/default.nix" 2>/dev/null | head -1)

    # Handle single quotes if double quotes didn't work
    if [ -z "$owner" ]; then
        owner=$(grep -Po "(?<=owner = ')[^']+" "$pkg_dir/default.nix" 2>/dev/null | head -1)
    fi
    if [ -z "$repo" ]; then
        repo=$(grep -Po "(?<=repo = ')[^']+" "$pkg_dir/default.nix" 2>/dev/null | head -1)
    fi

    # Handle ${pname} substitution
    if [ "$repo" = "\${pname}" ]; then
        repo="$pkg_name"
    fi

    if [ -z "$owner" ] || [ -z "$repo" ]; then
        log_warn "$pkg_name: Could not extract GitHub owner/repo"
        return 1
    fi

    log_info "$pkg_name: GitHub $owner/$repo"

    # Get latest release from GitHub API
    local latest_release=""
    local api_response

    # Use GitHub token if available for higher rate limits
    if [ -n "${GITHUB_TOKEN:-}" ]; then
        api_response=$(curl -sf -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/$owner/$repo/releases/latest" 2>/dev/null || true)
    else
        api_response=$(curl -sf "https://api.github.com/repos/$owner/$repo/releases/latest" 2>/dev/null || true)
    fi

    if [ -n "$api_response" ]; then
        latest_release=$(echo "$api_response" | jq -r '.tag_name // empty' 2>/dev/null || true)
    fi

    if [ -z "$latest_release" ]; then
        # Try tags if no releases
        if [ -n "${GITHUB_TOKEN:-}" ]; then
            api_response=$(curl -sf -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/$owner/$repo/tags" 2>/dev/null || true)
        else
            api_response=$(curl -sf "https://api.github.com/repos/$owner/$repo/tags" 2>/dev/null || true)
        fi
        if [ -n "$api_response" ]; then
            latest_release=$(echo "$api_response" | jq -r '.[0].name // empty' 2>/dev/null || true)
        fi
    fi

    if [ -z "$latest_release" ]; then
        log_warn "$pkg_name: Could not find latest release"
        return 1
    fi

    # Skip pre-releases
    if [[ "$latest_release" =~ (alpha|beta|rc|pre|dev|nightly) ]]; then
        log_warn "$pkg_name: Skipping pre-release $latest_release"
        return 1
    fi

    # Clean up version (remove v prefix)
    local latest_version="${latest_release#v}"

    log_info "$pkg_name: Latest version $latest_version"

    # Check if update is needed
    local needs_update=false
    if [[ "$current_version" =~ ^[a-f0-9]{40}$ ]] || [[ "$current_version" =~ ^[a-f0-9]{7,}$ ]]; then
        # Git hash version, always update to tagged release
        needs_update=true
        log_info "$pkg_name: Git hash version detected, updating to tagged release"
    elif [ "$current_version" != "$latest_version" ] && [ "v$current_version" != "$latest_release" ] && [ "$current_version" != "$latest_release" ]; then
        needs_update=true
    fi

    if [ "$needs_update" = "true" ]; then
        echo "$pkg_name|$current_version|$latest_version|$owner|$repo|$latest_release" >> "$UPDATES_FILE"
        log_success "$pkg_name: Update available $current_version -> $latest_version"
        return 0
    else
        log_info "$pkg_name: Already up to date"
        return 1
    fi
}

# Function to update a package
# Returns: 0=success, 1=hash fetch failed, 2=build failed
update_package() {
    local pkg_name="$1"
    local old_version="$2"
    local new_version="$3"
    local owner="$4"
    local repo="$5"
    local tag="$6"

    local pkg_dir="packages/$pkg_name"

    log_info "$pkg_name: Updating $old_version -> $new_version"

    # Get the new hash
    log_info "$pkg_name: Fetching hash for $owner/$repo at $tag..."
    local new_hash

    if command -v nix-prefetch-github &> /dev/null; then
        # Prefer nix-prefetch-github if available
        new_hash=$(nix-prefetch-github "$owner" "$repo" --rev "$tag" 2>&1 | jq -r .hash 2>/dev/null || echo "")
    else
        # Fallback to nix-prefetch-url with GitHub archive
        log_info "$pkg_name: Using nix-prefetch-url (nix-prefetch-github not found)"
        local archive_url="https://github.com/$owner/$repo/archive/$tag.tar.gz"
        local base32_hash=$(nix-prefetch-url --unpack "$archive_url" 2>/dev/null || echo "")
        if [ -n "$base32_hash" ]; then
            # Convert base32 to SRI format
            new_hash=$(nix hash convert --hash-algo sha256 --to sri "$base32_hash" 2>/dev/null || echo "")
        fi
    fi

    if [ -z "$new_hash" ]; then
        log_error "$pkg_name: Failed to fetch hash (repo/tag may not exist)"
        return 1  # Hash fetch failure - don't use LLM
    fi

    log_info "$pkg_name: New hash: $new_hash"

    # Backup original file
    cp "$pkg_dir/default.nix" "$pkg_dir/default.nix.bak"

    # Update version
    sed -i "s/version = \"$old_version\"/version = \"$new_version\"/" "$pkg_dir/default.nix"
    sed -i "s/version = '$old_version'/version = '$new_version'/" "$pkg_dir/default.nix"

    # Update rev (handle various formats)
    sed -i "s/rev = \"$old_version\"/rev = \"$tag\"/" "$pkg_dir/default.nix"
    sed -i "s/rev = \"v$old_version\"/rev = \"$tag\"/" "$pkg_dir/default.nix"
    sed -i "s/rev = \"\${version}\"/rev = \"$tag\"/" "$pkg_dir/default.nix"
    sed -i "s/rev = 'v\${version}'/rev = \"$tag\"/" "$pkg_dir/default.nix"

    # Update hash
    local old_hash
    old_hash=$(grep -Po '(?<=hash = ")[^"]+' "$pkg_dir/default.nix" 2>/dev/null | head -1)
    if [ -n "$old_hash" ]; then
        sed -i "s|hash = \"$old_hash\"|hash = \"$new_hash\"|" "$pkg_dir/default.nix"
    else
        old_hash=$(grep -Po '(?<=sha256 = ")[^"]+' "$pkg_dir/default.nix" 2>/dev/null | head -1)
        if [ -n "$old_hash" ]; then
            sed -i "s|sha256 = \"$old_hash\"|sha256 = \"$new_hash\"|" "$pkg_dir/default.nix"
        fi
    fi

    # Test build
    log_info "$pkg_name: Testing build..."
    local build_output
    if build_output=$(nix build ".#packages.x86_64-linux.$pkg_name" 2>&1); then
        log_success "$pkg_name: Build successful!"

        # Create commit
        git add "$pkg_dir/default.nix"
        if git commit -m "$pkg_name: $old_version -> $new_version"; then
            log_success "$pkg_name: Committed update"
            rm -f "$pkg_dir/default.nix.bak"
            return 0
        else
            log_warn "$pkg_name: Commit failed (maybe no changes?)"
            rm -f "$pkg_dir/default.nix.bak"
            return 0
        fi
    else
        log_error "$pkg_name: Build failed"
        echo "$build_output" | tail -20 | tee -a "$LOG_FILE"

        # Restore backup
        mv "$pkg_dir/default.nix.bak" "$pkg_dir/default.nix"

        # Save build error for LLM processing
        echo "$build_output" > "/tmp/${pkg_name}_build_error.log"

        return 2  # Build failure - can use LLM
    fi
}

# Function to fix a package using Goose (LLM)
fix_package_with_llm() {
    local pkg_name="$1"
    local old_version="$2"
    local new_version="$3"
    local owner="$4"
    local repo="$5"
    local tag="$6"

    if [ "$USE_LLM_FIXES" != "true" ]; then
        log_warn "$pkg_name: LLM fixes disabled, skipping"
        return 1
    fi

    if ! command -v goose &> /dev/null; then
        log_error "$pkg_name: Goose CLI not found, cannot use LLM fixes"
        return 1
    fi

    log_info "$pkg_name: Attempting fix with Goose LLM..."

    local pkg_dir="packages/$pkg_name"
    local error_log="/tmp/${pkg_name}_build_error.log"

    # Prepare context for LLM
    local build_error=""
    if [ -f "$error_log" ]; then
        build_error=$(cat "$error_log")
    fi

    # Create a focused prompt for Goose
    local prompt="I need help updating the Nix package '$pkg_name' from version $old_version to $new_version.

Package details:
- Location: $pkg_dir/default.nix
- GitHub: $owner/$repo
- New version tag: $tag

The automated update script failed with this build error:
\`\`\`
${build_error:0:2000}
\`\`\`

Please:
1. Read the current $pkg_dir/default.nix file
2. Analyze the build error and identify the root cause
3. Update the package definition correctly (version, hash, dependencies if needed)
4. Test the build with: nix build .#packages.x86_64-linux.$pkg_name
5. If successful, create a commit with message: $pkg_name: $old_version -> $new_version

Be careful with:
- Non-standard version formats
- Dependencies that may have changed
- Build system changes between versions
- Platform-specific issues"

    # Run Goose
    if goose run --provider "$GOOSE_PROVIDER" --model "$GOOSE_MODEL" --no-session -t "$prompt" 2>&1 | tee -a "$LOG_FILE"; then
        # Check if the update was successful by looking at git status
        if git log -1 --oneline | grep -q "$pkg_name:"; then
            log_success "$pkg_name: LLM successfully fixed and committed the update"
            rm -f "$error_log"
            return 0
        else
            log_warn "$pkg_name: LLM ran but didn't create a commit"
            return 1
        fi
    else
        log_error "$pkg_name: LLM fix attempt failed"
        return 1
    fi
}

# Main execution
log_info "Starting package update run..."
log_info "Configuration: LLM_FIXES=$USE_LLM_FIXES, PROVIDER=$GOOSE_PROVIDER, MODEL=$GOOSE_MODEL"

# Check dependencies and API limits
if ! check_dependencies; then
    exit 1
fi
echo ""

# Phase 1: Scan for updates
log_info "=== Phase 1: Scanning for updates ==="
for pkg_dir in packages/*/; do
    total_checked=$((total_checked + 1))
    check_for_updates "$pkg_dir" || true
done
echo ""

# Phase 2: Apply updates
log_info "=== Phase 2: Applying updates ==="
if [ ! -s "$UPDATES_FILE" ]; then
    log_success "No updates needed! All packages are up to date."
    exit 0
fi

while IFS='|' read -r pkg_name old_ver new_ver owner repo tag; do
    log_info "Processing $pkg_name..."

    # Capture return code without triggering set -e
    set +e
    update_package "$pkg_name" "$old_ver" "$new_ver" "$owner" "$repo" "$tag"
    result=$?
    set -e

    if [ $result -eq 0 ]; then
        # Success
        total_updated=$((total_updated + 1))
    elif [ $result -eq 1 ]; then
        # Hash fetch failure - skip LLM, can't fix this
        log_error "$pkg_name: Hash fetch failed, skipping (LLM can't fix this)"
        echo "$pkg_name|$old_ver|$new_ver|$owner|$repo|$tag|HASH_FETCH_FAILED" >> "$FAILED_FILE"
        total_failed=$((total_failed + 1))
    elif [ $result -eq 2 ]; then
        # Build failure - try LLM fix
        log_warn "$pkg_name: Build failed, attempting LLM fix..."

        set +e
        fix_package_with_llm "$pkg_name" "$old_ver" "$new_ver" "$owner" "$repo" "$tag"
        llm_result=$?
        set -e

        if [ $llm_result -eq 0 ]; then
            total_llm_fixed=$((total_llm_fixed + 1))
            total_updated=$((total_updated + 1))
        else
            log_error "$pkg_name: LLM fix failed"
            echo "$pkg_name|$old_ver|$new_ver|$owner|$repo|$tag|BUILD_FAILED" >> "$FAILED_FILE"
            total_failed=$((total_failed + 1))
        fi
    fi

    echo ""
done < "$UPDATES_FILE"

# Summary
echo ""
log_info "=== Update Summary ==="
log_info "Total packages checked: $total_checked"
log_success "Successfully updated: $total_updated"
log_info "  - Standard updates: $((total_updated - total_llm_fixed))"
log_info "  - LLM-fixed updates: $total_llm_fixed"
log_error "Failed updates: $total_failed"
echo ""

if [ -s "$FAILED_FILE" ]; then
    log_warn "Failed packages:"
    while IFS='|' read -r name old_ver new_ver owner repo tag; do
        log_warn "  - $name: $old_ver -> $new_ver"
    done < "$FAILED_FILE"
    echo ""
fi

if [ $total_updated -gt 0 ]; then
    log_success "Recent commits:"
    git log --oneline -n $total_updated
fi

log_info "Full log saved to: $LOG_FILE"
