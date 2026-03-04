{ lib, stdenv, fetchurl, pkg-config, libdaemon, bison, flex, check, libbsd, autoreconfHook, fetchFromGitHub }:
#with import <nixpkgs> {};

stdenv.mkDerivation rec {
  pname = "radvd";
  version = "2.20";

  src = fetchFromGitHub {
    owner = "radvd-project";
    repo = "radvd";
    rev = "v${version}";
    hash = "sha256-090b8953cq7pvxf8i5wsippsi3zc8jxy559k6jpfjjmbbvl8zlmk";
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
