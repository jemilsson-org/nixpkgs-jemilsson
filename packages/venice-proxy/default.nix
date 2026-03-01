{ lib
, python3
, fetchFromGitHub
}:

python3.pkgs.buildPythonApplication rec {
  pname = "venice-proxy";
  version = "0.1.0";

  src = ./.;

  format = "other";

  propagatedBuildInputs = with python3.pkgs; [
    fastapi
    uvicorn
    httpx
    pydantic
    python-dotenv
  ];

  installPhase = ''
    mkdir -p $out/bin
    mkdir -p $out/lib/python${python3.pythonVersion}/site-packages
    
    # Copy the Python module
    cp venice_proxy.py $out/lib/python${python3.pythonVersion}/site-packages/
    
    # Create the executable script
    cat > $out/bin/venice-proxy <<EOF
#!/usr/bin/env python3
import sys
import os
sys.path.insert(0, '$out/lib/python${python3.pythonVersion}/site-packages')

# Import and run the main function
if __name__ == "__main__":
    import venice_proxy
    import uvicorn
    
    port = int(os.getenv("PROXY_PORT", "8000"))
    host = os.getenv("PROXY_HOST", "0.0.0.0")
    
    uvicorn.run(venice_proxy.app, host=host, port=port)
EOF
    chmod +x $out/bin/venice-proxy
  '';

  meta = with lib; {
    description = "FastAPI proxy server that implements OpenAI's streaming response API for Venice AI";
    homepage = "https://github.com/yourusername/venice-proxy";
    license = licenses.mit;
    maintainers = with maintainers; [ ];
    mainProgram = "venice-proxy";
  };
}