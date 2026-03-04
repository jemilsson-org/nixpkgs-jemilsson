# Package Update Workflow

## Overview

This repository uses an AI-enhanced automated package update system that combines traditional automation with LLM-based error fixing.

## Main Script: update-packages-ai.sh

The consolidated update script that handles everything:

### Features

- **Automatic version detection**: Scans all packages for available updates from GitHub
- **Intelligent updates**: Updates version, git rev, and package hash automatically
- **Build testing**: Tests each package before committing
- **LLM error fixing**: Uses Goose CLI with Venice.ai to fix build failures
- **Comprehensive logging**: All operations logged to `update-packages.log`
- **Detailed statistics**: Shows updates, failures, and LLM fixes

### Usage

```bash
# First run downloads dependencies automatically via nix-shell
./update-packages-ai.sh

# Run with default settings (LLM fixes enabled)
./update-packages-ai.sh

# Run without LLM fixes
USE_LLM_FIXES=false ./update-packages-ai.sh

# Use different LLM provider/model
GOOSE_PROVIDER=openai GOOSE_MODEL=gpt-4 ./update-packages-ai.sh

# Run manually with nix-shell (if script is not executable)
nix-shell update-packages-ai.sh
```

### Environment Variables

- `USE_LLM_FIXES` (default: `true`) - Enable/disable LLM-based error fixing
- `GOOSE_PROVIDER` (default: `venice`) - LLM provider to use
- `GOOSE_MODEL` (default: `zai-org-glm-5`) - Model to use for fixes
- `GITHUB_TOKEN` (optional) - GitHub personal access token for 5000 req/hour (vs 60/hour unauthenticated)

### How It Works

#### Phase 1: Scanning
1. Iterates through all packages in `packages/*/`
2. Extracts current version from `default.nix`
3. Queries GitHub API for latest release/tag
4. Skips pre-releases (alpha, beta, rc, etc.)
5. Identifies packages needing updates
6. Writes candidates to `updates.txt`

#### Phase 2: Updating
For each package needing an update:

1. **Standard update attempt**:
   - Fetches new hash using `nix-prefetch-github`
   - Updates version, rev, and hash in `default.nix`
   - Tests build with `nix build`
   - Commits if successful

2. **LLM fix attempt** (if standard update fails):
   - Sends build error to Goose CLI
   - LLM analyzes the error and package definition
   - LLM attempts to fix dependencies, build config, etc.
   - Tests and commits if successful

3. **Skip and log** (if both attempts fail):
   - Adds to `failed-updates.txt`
   - Continues with next package

### Output Files

- `update-packages.log` - Detailed log of all operations
- `updates.txt` - List of packages with available updates
- `failed-updates.txt` - Packages that couldn't be updated
- `/tmp/<package>_build_error.log` - Build errors for LLM analysis

### Prerequisites

**All dependencies are automatically provided via nix-shell!**

The script uses a Nix shebang that automatically loads:
- `bash` - Shell interpreter
- `curl` - HTTP requests to GitHub API
- `jq` - JSON parsing
- `nix-prefetch-github` - Fetching package hashes
- `goose` - LLM-based error fixing (optional)

**Additional requirements:**
- `nix` with flakes enabled
- Venice.ai API key in environment (if using LLM fixes)

The first run will download dependencies (~20MB), subsequent runs are instant.

### Goose Configuration

Ensure Goose is configured for Venice.ai:

```bash
mkdir -p ~/.config/goose
cat > ~/.config/goose/config.yaml << EOF
providers:
  venice:
    type: openai
    base_url: https://api.venice.ai/api/v1
    model: zai-org-glm-5
default_provider: venice
keyring: false
GOOSE_DISABLE_KEYRING: true
EOF
```

Set environment variables:
```bash
export VENICE_API_KEY="your-api-key"
export OPENAI_API_KEY="$VENICE_API_KEY"  # Goose uses OpenAI env var
```

## GitHub Actions Integration

The workflows in `.github/workflows/` use this script for automated updates:

- `update-packages.yml` - Weekly automated updates with PR creation
- `batch-update-packages.yml` - Batch processing of packages in parallel

## Migration from Old Scripts

Replaced scripts:
- ❌ `update-packages.sh` - Detection only (now Phase 1)
- ❌ `auto-update-packages.sh` - Basic automation (now Phase 2)
- ❌ `update-radvd.sh` - One-off script (no longer needed)

All functionality is now in `update-packages-ai.sh`.

## Examples

### Successful update
```
[INFO] radvd: Current version f67335b5335b6ed5ca68d6fa71c08cccb4f3a629
[INFO] radvd: Latest version 2.20
[SUCCESS] radvd: Update available f67335b5335b6ed5ca68d6fa71c08cccb4f3a629 -> 2.20
[INFO] radvd: Fetching hash for radvd-project/radvd at v2.20...
[INFO] radvd: New hash: sha256-xyz...
[SUCCESS] radvd: Build successful!
[SUCCESS] radvd: Committed update
```

### LLM fix example
```
[ERROR] somepackage: Build failed
[INFO] somepackage: Attempting fix with Goose LLM...
[INFO] LLM analyzing build error and package definition...
[SUCCESS] somepackage: LLM successfully fixed and committed the update
```

## Tips

- Run manually before relying on CI to test the workflow
- Review `update-packages.log` for detailed troubleshooting
- Check `failed-updates.txt` for packages needing manual intervention
- Git commits are created per package for easy review/revert
