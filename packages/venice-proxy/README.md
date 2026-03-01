# Venice AI Proxy with OpenAI Responses API Support

A FastAPI proxy that implements OpenAI's stateful Responses API for Venice AI, enabling conversation management and response retrieval.

## Features

### Core Functionality
- **Stateful Responses API** (`/v1/responses`): Maintains conversation history across requests
- **Session Management**: Track and manage multiple conversation sessions
- **Response Retrieval**: Retrieve any previous response by ID
- **Streaming Support**: Full SSE streaming for real-time responses
- **Standard Chat Completions**: Also supports stateless OpenAI chat completions

### Key Endpoints

#### Stateful Responses API
- `POST /v1/responses` - Create a new response with optional session management
- `GET /v1/responses/{response_id}` - Retrieve a specific response by ID
- `GET /v1/responses` - List recent responses

#### Session Management
- `GET /v1/sessions/{session_id}` - Get session with conversation history
- `DELETE /v1/sessions/{session_id}` - Delete a session
- `POST /v1/sessions/{session_id}/messages` - Add message to session
- `GET /v1/sessions` - List active sessions

#### Standard OpenAI Compatibility
- `POST /v1/chat/completions` - Stateless chat completions (with streaming)
- `GET /v1/models` - List available models

## Installation

### Nix Package

```nix
{ pkgs, ... }:

{
  environment.systemPackages = with pkgs; [
    venice-proxy
  ];
}
```

### Systemd Service

```nix
{ pkgs, ... }:

{
  systemd.services.venice-proxy = {
    description = "Venice AI Proxy with Responses API";
    after = [ "network.target" ];
    wantedBy = [ "multi-user.target" ];
    
    environment = {
      VENICE_API_KEY = "your_api_key"; # Use secrets management
      VENICE_API_BASE = "https://api.venice.ai/api/v1";
      PROXY_HOST = "0.0.0.0";
      PROXY_PORT = "8000";
    };
    
    serviceConfig = {
      ExecStart = "${pkgs.venice-proxy}/bin/venice-proxy";
      Restart = "on-failure";
      User = "venice-proxy";
      Group = "venice-proxy";
    };
  };

  users.users.venice-proxy = {
    isSystemUser = true;
    group = "venice-proxy";
  };
  
  users.groups.venice-proxy = {};
}
```

## Usage Examples

### Stateful Conversations with Responses API

```python
import httpx
import json

# Start a new conversation
response = httpx.post(
    "http://localhost:8000/v1/responses",
    json={
        "model": "llama-3.3-70b",
        "messages": [{"role": "user", "content": "Hello!"}],
        "instructions": "You are a helpful assistant"
    }
)
data = response.json()
session_id = data["session_id"]
response_id = data["id"]

# Continue the conversation with the same session
response = httpx.post(
    "http://localhost:8000/v1/responses",
    json={
        "model": "llama-3.3-70b",
        "session_id": session_id,
        "messages": [{"role": "user", "content": "What did I just say?"}]
    }
)

# Retrieve a previous response
response = httpx.get(f"http://localhost:8000/v1/responses/{response_id}")

# Get full conversation history
response = httpx.get(f"http://localhost:8000/v1/sessions/{session_id}")
```

### Streaming with Responses API

```python
import httpx
import json

with httpx.stream(
    "POST",
    "http://localhost:8000/v1/responses",
    json={
        "model": "llama-3.3-70b",
        "messages": [{"role": "user", "content": "Tell me a story"}],
        "stream": True
    }
) as response:
    for line in response.iter_lines():
        if line.startswith("data: "):
            data = line[6:]
            if data != "[DONE]":
                chunk = json.loads(data)
                # Process streaming chunk
```

### Standard OpenAI Client

```python
from openai import OpenAI

client = OpenAI(
    api_key="your_venice_api_key",
    base_url="http://localhost:8000/v1"
)

# Standard stateless completion
response = client.chat.completions.create(
    model="llama-3.3-70b",
    messages=[{"role": "user", "content": "Hello!"}],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

## Environment Variables

- `VENICE_API_KEY` (required): Your Venice AI API key
- `VENICE_API_BASE`: Venice API base URL (default: https://api.venice.ai/api/v1)
- `PROXY_HOST`: Host to bind (default: 0.0.0.0)
- `PROXY_PORT`: Port to run on (default: 8000)

## Architecture

The proxy maintains in-memory storage for:
- **Responses**: Complete responses indexed by ID for retrieval
- **Sessions**: Conversation histories with message threads

In production, consider using Redis or a database for persistence.

## Response Headers

The proxy adds custom headers to responses:
- `X-Response-Id`: Unique ID for response retrieval
- `X-Session-Id`: Session ID for conversation continuity