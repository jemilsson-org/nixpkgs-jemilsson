{
  description = "Custom Nix packages collection by jemilsson";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, nixpkgs-unstable }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      # Direct packages output for each system
      packages = forAllSystems (system:
        let
          pkgs = import nixpkgs {
            inherit system;
            config.allowUnfree = true;
          };
          unstable = import nixpkgs-unstable {
            inherit system;
            config.allowUnfree = true;
          };
          
          # Import all packages from the packages directory
          packageDir = ./packages;
          packageDirs = builtins.attrNames (builtins.readDir packageDir);
          isValidPackage = name: 
            builtins.pathExists (packageDir + "/${name}/default.nix");
          validPackages = builtins.filter isValidPackage packageDirs;
        in
          builtins.listToAttrs (map (name: {
            inherit name;
            value = pkgs.callPackage (packageDir + "/${name}/default.nix") { };
          }) validPackages)
      );

      # Formatter for nix fmt
      formatter = forAllSystems (system:
        nixpkgs.legacyPackages.${system}.nixpkgs-fmt
      );
    };
}