# nixpkgs-jemilsson

Custom Nix packages collection.

## Usage

### In a flake

```nix
{
  inputs = {
    nixpkgs-jemilsson.url = "github:jemilsson-org/nixpkgs-jemilsson";
  };

  outputs = { self, nixpkgs, nixpkgs-jemilsson, ... }: {
    # Use packages directly
    environment.systemPackages = [
      nixpkgs-jemilsson.packages.${pkgs.system}.forensic-webcapture
    ];
  };
}
```

### Direct installation

```bash
# Install a package
nix profile install github:jemilsson-org/nixpkgs-jemilsson#forensic-webcapture

# Run without installing
nix run github:jemilsson-org/nixpkgs-jemilsson#forensic-webcapture
```

## Available Packages

Run `nix flake show github:jemilsson-org/nixpkgs-jemilsson` to see all available packages.