{ lib, stdenv, fetchurl, pkg-config, libdaemon, bison, flex, check, libbsd, autoreconfHook, fetchFromGitHub }:
#with import <nixpkgs> {};

stdenv.mkDerivation rec {
  pname = "radvd";
  version = "f67335b5335b6ed5ca68d6fa71c08cccb4f3a629";

  src = fetchFromGitHub {
    owner = "radvd-project";
    repo = "radvd";
    rev = "${version}";
    hash = "sha256-mkVQTtXq7RnAISy5cgO/mJ//ziqQdfUZk6LZtcoaLgk=";
  };

  nativeBuildInputs = [ pkg-config bison flex libbsd check autoreconfHook ];
  buildInputs = [ libdaemon ];

  # Needed for cross-compilation
  makeFlags = [
    "AR=${stdenv.cc.targetPrefix}ar"
  ];

  meta = with lib; {
    homepage = "http://www.litech.org/radvd/";
    description = "IPv6 Router Advertisement Daemon";
    platforms = platforms.linux;
    license = licenses.bsdOriginal;
    maintainers = with maintainers; [ fpletz ];
  };
}
