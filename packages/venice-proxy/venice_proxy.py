import os
import json
import httpx
import uuid
import time
from typing import AsyncIterator, Optional, Dict, Any, List
from fastapi import FastAPI, Request, HTTPException, Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import logging

# Set up logging to reduce verbosity
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)
logger.setLevel(logging.WARNING)

# Also set the venice_proxy module logger specifically
logging.getLogger("venice_proxy").setLevel(logging.WARNING)

app = FastAPI(title="Venice AI Proxy with OpenAI Responses API Support")

VENICE_API_BASE = os.getenv("VENICE_API_BASE", "https://api.venice.ai/api/v1")
VENICE_API_KEY = os.getenv("VENICE_API_KEY")

if not VENICE_API_KEY:
    raise ValueError("VENICE_API_KEY environment variable is required")

# In-memory storage for responses/sessions
# In production, this should be Redis or a database
responses_store: Dict[str, Dict[str, Any]] = {}
sessions_store: Dict[str, Dict[str, Any]] = {}


class ResponsesRequest(BaseModel):
    model: str
    messages: Optional[List[Dict[str, str]]] = None
    session_id: Optional[str] = None
    instructions: Optional[str] = None
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None
    stream: Optional[bool] = False
    venice_parameters: Optional[Dict[str, Any]] = None


class ChatCompletionRequest(BaseModel):
    model: str
    messages: list
    stream: Optional[bool] = False
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None
    top_p: Optional[float] = None
    frequency_penalty: Optional[float] = None
    presence_penalty: Optional[float] = None
    stop: Optional[Any] = None
    venice_parameters: Optional[Dict[str, Any]] = None


def generate_response_id() -> str:
    """Generate a unique response ID"""
    return f"resp_{uuid.uuid4().hex}"


def generate_session_id() -> str:
    """Generate a unique session ID"""
    return f"sess_{uuid.uuid4().hex}"


async def stream_venice_response(response: httpx.Response, response_id: str) -> AsyncIterator[str]:
    """
    Convert Venice AI streaming response to OpenAI SSE format.
    Store the complete response for later retrieval.
    """
    complete_response = {
        "id": response_id,
        "object": "chat.completion",
        "created": int(time.time()),
        "model": "",
        "choices": [{
            "index": 0,
            "message": {"role": "assistant", "content": ""},
            "finish_reason": None
        }]
    }
    
    async for line in response.aiter_lines():
        if line:
            if line.startswith("data: "):
                data_str = line[6:]
                if data_str == "[DONE]":
                    complete_response["choices"][0]["finish_reason"] = "stop"
                    responses_store[response_id] = complete_response
                    yield f"{line}\n\n"
                else:
                    try:
                        chunk = json.loads(data_str)
                        if not complete_response["model"] and "model" in chunk:
                            complete_response["model"] = chunk["model"]
                        
                        if chunk.get("choices") and chunk["choices"][0].get("delta"):
                            content = chunk["choices"][0]["delta"].get("content", "")
                            if content:
                                complete_response["choices"][0]["message"]["content"] += content
                        
                        yield f"{line}\n\n"
                    except json.JSONDecodeError:
                        yield f"{line}\n\n"
            else:
                yield f"data: {line}\n\n"
    
    yield "data: [DONE]\n\n"


@app.post("/v1/responses")
async def create_response(request: Request):
    """
    Translate OpenAI responses API calls to Venice chat completions.
    Handles client.responses.parse() calls from Graphiti.
    """
    try:
        body = await request.json()
        logger.debug(f"Received responses request body: {body}")
        
        # Extract parameters from OpenAI responses API format
        model = body.get("model", "venice-uncensored")
        messages = body.get("messages", [])
        response_format = body.get("response_format")
        max_tokens = body.get("max_tokens", body.get("max_output_tokens", 8192))
        temperature = body.get("temperature")
        
        # Check if response format is in 'text.format' field (Graphiti sends it this way)
        if not response_format and "text" in body and isinstance(body["text"], dict):
            text_format = body["text"].get("format")
            if text_format:
                response_format = text_format
                logger.debug(f"Found response format in text.format: {response_format}")
        
        # If no messages provided, try to extract from other fields
        if not messages:
            # Check for 'input' field (sometimes used in responses API)
            if "input" in body:
                messages = [{"role": "user", "content": str(body["input"])}]
            # Check for 'prompt' field
            elif "prompt" in body:
                messages = [{"role": "user", "content": str(body["prompt"])}]
            else:
                # Default fallback
                messages = [{"role": "user", "content": "Please provide a response."}]
                logger.warning("No messages found in responses request, using default")
        
        # Build chat completions request
        chat_request = {
            "model": model,
            "messages": messages,
            "max_tokens": max_tokens
        }
        
        # Add optional parameters
        if temperature is not None:
            chat_request["temperature"] = temperature
            
        # Handle response format - Venice supports structured responses but with different format
        if response_format:
            if isinstance(response_format, dict):
                if response_format.get("type") == "json_schema":
                    # Convert OpenAI format to Venice format
                    venice_response_format = {
                        "type": "json_schema",
                        "json_schema": {
                            "name": response_format.get("name", "Response"),
                            "schema": response_format.get("schema", {}),
                            "strict": response_format.get("strict", True)
                        }
                    }
                    chat_request["response_format"] = venice_response_format
                    logger.debug(f"Converted to Venice response format: {venice_response_format}")
                elif response_format.get("type") == "json_object":
                    chat_request["response_format"] = {"type": "json_object"}
                else:
                    chat_request["response_format"] = response_format
        
        logger.debug(f"Translated to chat request: {chat_request}")
        
        # Forward to Venice chat completions
        headers = {
            "Authorization": f"Bearer {VENICE_API_KEY}",
            "Content-Type": "application/json"
        }
        
        async with httpx.AsyncClient() as client:
            venice_url = f"{VENICE_API_BASE}/chat/completions"
            response = await client.post(
                venice_url,
                json=chat_request,
                headers=headers,
                timeout=httpx.Timeout(30.0, connect=10.0)  # 30s timeout for LLM responses
            )
            
            if response.status_code != 200:
                error_text = response.text
                logger.error(f"Venice API error {response.status_code}: {error_text}")
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Venice API error: {error_text}"
                )
            
            chat_response = response.json()
            
            # Transform Venice chat response to OpenAI Responses API format
            # Based on the actual sample you provided
            response_id = chat_response.get("id", generate_response_id())
            responses_response = {
                "id": response_id,
                "object": "response",
                "created_at": chat_response.get("created", int(time.time())),
                "status": "completed",
                "error": None,
                "incomplete_details": None,
                "instructions": None,
                "max_output_tokens": None,
                "model": chat_response.get("model", "venice-uncensored"),
                "output": [],
                "parallel_tool_calls": True,
                "previous_response_id": None,
                "reasoning": {
                    "effort": None,
                    "summary": None
                },
                "store": True,
                "temperature": temperature or 1.0,
                "text": {
                    "format": {
                        "type": "text"
                    }
                },
                "tool_choice": "auto",
                "tools": [],
                "top_p": 1.0,
                "truncation": "disabled",
                "usage": {
                    "input_tokens": 0,
                    "input_tokens_details": {
                        "cached_tokens": 0
                    },
                    "output_tokens": 0,
                    "output_tokens_details": {
                        "reasoning_tokens": 0
                    },
                    "total_tokens": 0
                },
                "user": None,
                "metadata": {}
            }
            
            # Transform choices to responses API "output" format
            choices = chat_response.get("choices", [])
            if not choices:
                # Create a default choice if Venice didn't return any
                logger.warning("Venice returned no choices, creating default choice")
                choices = [{
                    "index": 0,
                    "message": {"role": "assistant", "content": ""},
                    "finish_reason": "stop"
                }]
            
            for choice in choices:
                # Ensure message is always present and not None
                message = choice.get("message") or {}
                content = message.get("content", "")
                
                # Create output message exactly like the sample you provided
                output_message = {
                    "type": "message",
                    "id": f"msg_{response_id}",
                    "status": "completed", 
                    "role": message.get("role", "assistant"),
                    "content": []
                }
                
                # Handle structured response format or regular text
                if response_format and content:
                    # For structured responses with JSON schema, try to parse JSON
                    try:
                        # With Venice's native structured response support, it should be clean JSON
                        parsed_content = json.loads(content)
                        # Always use output_text type with the actual content as text
                        # but we could add structured info if needed
                        output_message["content"].append({
                            "type": "output_text", 
                            "text": content,  # Keep original content as text
                            "annotations": []
                        })
                        logger.debug("Successfully parsed Venice structured response")
                    except json.JSONDecodeError as e:
                        logger.warning(f"Venice structured response not valid JSON, trying markdown extraction: {e}")
                        try:
                            # Fallback: try extracting from markdown if Venice still wraps it
                            if "```json" in content:
                                start = content.find("```json") + 7
                                end = content.find("```", start)
                                if end > start:
                                    json_str = content[start:end].strip()
                                    parsed_content = json.loads(json_str)
                                    # Use the parsed JSON as the content
                                    output_message["content"].append({
                                        "type": "output_text",
                                        "text": json_str,  # Use the clean JSON string
                                        "annotations": []
                                    })
                                    logger.debug("Successfully parsed from markdown")
                                else:
                                    logger.error("Could not extract JSON from markdown")
                                    # Fallback to regular text
                                    output_message["content"].append({
                                        "type": "output_text",
                                        "text": content,
                                        "annotations": []
                                    })
                            else:
                                logger.error(f"Content was not JSON: {content}")
                                # Fallback to regular text
                                output_message["content"].append({
                                    "type": "output_text",
                                    "text": content,
                                    "annotations": []
                                })
                        except json.JSONDecodeError as e2:
                            logger.error(f"Failed all JSON parsing attempts: {e2}")
                            logger.error(f"Content was: {content}")
                            # Fallback to regular text
                            output_message["content"].append({
                                "type": "output_text",
                                "text": content,
                                "annotations": []
                            })
                else:
                    # Regular text response - exactly like your sample
                    output_message["content"].append({
                        "type": "output_text",
                        "text": content,
                        "annotations": []
                    })
                
                responses_response["output"].append(output_message)
            
            # Update usage information with proper structure for responses API
            if chat_response.get("usage"):
                usage = chat_response["usage"]
                responses_response["usage"] = {
                    "input_tokens": usage.get("prompt_tokens", 0),
                    "input_tokens_details": {
                        "cached_tokens": 0
                    },
                    "output_tokens": usage.get("completion_tokens", 0),
                    "output_tokens_details": {
                        "reasoning_tokens": 0
                    },
                    "total_tokens": usage.get("total_tokens", 0)
                }
            
            # Update text format based on response_format
            if response_format:
                if response_format.get("type") == "json_schema":
                    responses_response["text"]["format"] = {
                        "type": "json_schema",
                        "json_schema": response_format.get("json_schema", {})
                    }
                elif response_format.get("type") == "json_object":
                    responses_response["text"]["format"] = {
                        "type": "json_object"
                    }
                
            logger.debug("Returning responses format")
            return responses_response
            
    except json.JSONDecodeError:
        logger.error("Invalid JSON in responses request")
        raise HTTPException(status_code=400, detail="Invalid JSON")
    except httpx.ReadTimeout:
        logger.error("Venice API request timed out")
        raise HTTPException(status_code=504, detail="Venice API request timed out")
    except httpx.RequestError as e:
        logger.error(f"Venice API request error: {str(e)}")
        raise HTTPException(status_code=502, detail=f"Venice API request error: {str(e)}")
    except Exception as e:
        logger.error(f"Error in responses endpoint: {str(e)}")
        logger.exception("Full traceback:")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/v1/responses/{response_id}")
async def get_response(response_id: str):
    """
    Retrieve a previously created response by ID.
    """
    if response_id not in responses_store:
        raise HTTPException(status_code=404, detail="Response not found")
    
    return responses_store[response_id]


@app.get("/v1/sessions/{session_id}")
async def get_session(session_id: str):
    """
    Retrieve session information including conversation history.
    """
    if session_id not in sessions_store:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return sessions_store[session_id]


@app.delete("/v1/sessions/{session_id}")
async def delete_session(session_id: str):
    """
    Delete a session and its conversation history.
    """
    if session_id not in sessions_store:
        raise HTTPException(status_code=404, detail="Session not found")
    
    del sessions_store[session_id]
    
    # Also delete associated responses
    response_ids_to_delete = [
        rid for rid, resp in responses_store.items() 
        if resp.get("session_id") == session_id
    ]
    for rid in response_ids_to_delete:
        del responses_store[rid]
    
    return {"message": "Session deleted", "session_id": session_id}


@app.post("/v1/sessions/{session_id}/messages")
async def add_message_to_session(session_id: str, message: Dict[str, str]):
    """
    Add a message to an existing session without generating a response.
    Useful for adding user corrections or context.
    """
    if session_id not in sessions_store:
        raise HTTPException(status_code=404, detail="Session not found")
    
    sessions_store[session_id]["messages"].append(message)
    
    return {"message": "Message added to session", "session_id": session_id}


@app.post("/v1/chat/completions")
@app.post("/chat/completions")
async def chat_completions(request: Request):
    """
    Standard OpenAI chat completions endpoint.
    Stateless - does not maintain conversation history.
    """
    try:
        body = await request.json()
        is_streaming = body.get("stream", False)
        
        headers = {
            "Authorization": f"Bearer {VENICE_API_KEY}",
            "Content-Type": "application/json"
        }
        
        if is_streaming:
            headers["Accept"] = "text/event-stream"
        
        async with httpx.AsyncClient() as client:
            venice_url = f"{VENICE_API_BASE}/chat/completions"
            
            if is_streaming:
                response_id = generate_response_id()
                
                async with client.stream(
                    "POST",
                    venice_url,
                    json=body,
                    headers=headers,
                    timeout=httpx.Timeout(30.0, connect=10.0)
                ) as response:
                    if response.status_code != 200:
                        error_text = await response.aread()
                        raise HTTPException(
                            status_code=response.status_code,
                            detail=f"Venice API error: {error_text.decode()}"
                        )
                    
                    return StreamingResponse(
                        stream_venice_response(response, response_id),
                        media_type="text/event-stream",
                        headers={
                            "Cache-Control": "no-cache",
                            "Connection": "keep-alive",
                            "X-Accel-Buffering": "no",
                            "X-Response-Id": response_id
                        }
                    )
            else:
                response = await client.post(
                    venice_url,
                    json=body,
                    headers=headers,
                    timeout=httpx.Timeout(30.0)
                )
                
                if response.status_code != 200:
                    raise HTTPException(
                        status_code=response.status_code,
                        detail=f"Venice API error: {response.text}"
                    )
                
                result = response.json()
                
                # Optionally store for retrieval
                response_id = generate_response_id()
                responses_store[response_id] = {
                    **result,
                    "id": response_id
                }
                result["id"] = response_id
                
                return result
                
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON in request body")
    except httpx.RequestError as e:
        logger.error(f"Request error: {str(e)}")
        raise HTTPException(status_code=502, detail=f"Error connecting to Venice AI: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")



@app.get("/health")
async def health_check():
    """
    Health check endpoint for the proxy.
    """
    return {
        "status": "healthy",
        "service": "Venice AI Proxy with Responses API",
        "active_sessions": len(sessions_store),
        "stored_responses": len(responses_store)
    }


@app.get("/v1/responses")
async def list_responses(limit: int = 10):
    """
    List recent responses (for debugging/monitoring).
    """
    response_list = sorted(
        responses_store.values(),
        key=lambda x: x.get("created", 0),
        reverse=True
    )[:limit]
    
    return {
        "data": response_list,
        "total": len(responses_store)
    }


@app.get("/v1/sessions")
async def list_sessions(limit: int = 10):
    """
    List active sessions (for debugging/monitoring).
    """
    session_list = sorted(
        sessions_store.values(),
        key=lambda x: x.get("created", 0),
        reverse=True
    )[:limit]
    
    return {
        "data": session_list,
        "total": len(sessions_store)
    }


@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def catch_all_proxy(request: Request, path: str):
    """
    Catch-all proxy for any other endpoints not explicitly handled.
    This ensures compatibility with any Venice AI endpoints we haven't specifically implemented.
    """
    # Log all incoming requests with details
    logger.warning(f"Catch-all proxy: {request.method} /{path}")
    logger.warning(f"  Client: {request.client.host if request.client else 'unknown'}")
    logger.warning(f"  Headers: {dict(request.headers)}")
    
    # Build the Venice API URL - strip /v1 prefix if present to avoid duplication
    clean_path = path[3:] if path.startswith("v1/") else path
    venice_url = f"{VENICE_API_BASE}/{clean_path}"
    
    # Get the request body if present
    body = None
    if request.method in ["POST", "PUT", "PATCH"]:
        try:
            body = await request.json()
            logger.warning(f"  Body (JSON): {body}")
        except:
            body = await request.body()
            logger.warning(f"  Body (raw): {body[:200] if body else 'empty'}...")
    
    # Forward headers, adding authorization
    headers = {
        "Authorization": f"Bearer {VENICE_API_KEY}",
    }
    
    # Add content-type if we have a JSON body
    if body and isinstance(body, dict):
        headers["Content-Type"] = "application/json"
    
    async with httpx.AsyncClient() as client:
        try:
            if isinstance(body, dict):
                response = await client.request(
                    method=request.method,
                    url=venice_url,
                    json=body,
                    headers=headers,
                    timeout=httpx.Timeout(30.0)
                )
            elif body:
                response = await client.request(
                    method=request.method,
                    url=venice_url,
                    content=body,
                    headers=headers,
                    timeout=httpx.Timeout(30.0)
                )
            else:
                response = await client.request(
                    method=request.method,
                    url=venice_url,
                    headers=headers,
                    timeout=httpx.Timeout(30.0)
                )
            
            # Log the response
            logger.warning(f"  Venice response: {response.status_code}")
            logger.warning(f"  Venice headers: {dict(response.headers)}")
            if response.status_code >= 400:
                logger.warning(f"  Venice error body: {response.text[:500]}")
            
            # Return the response with the same status code
            # Filter out headers that might cause issues with OpenAI client
            filtered_headers = {
                k: v for k, v in response.headers.items() 
                if k.lower() not in ['content-encoding', 'transfer-encoding', 'connection']
            }
            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=filtered_headers
            )
        except httpx.RequestError as e:
            logger.error(f"Request error for path {path}: {str(e)}")
            raise HTTPException(status_code=502, detail=f"Error connecting to Venice AI: {str(e)}")


# Module can be imported - main execution handled by wrapper script