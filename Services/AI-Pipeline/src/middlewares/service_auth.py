"""
Service-to-service authentication middleware.

Validates API key for internal service communication.
The main Node.js Server includes this key when calling the AI Pipeline.
"""

from fastapi import Request, HTTPException
from src.config import settings
from src.utils.logger import logger


async def verify_service_key(request: Request):
    """
    Verify the service API key from the request header.

    The Node.js Server must include:
      X-Service-Key: <shared_api_key>

    Skipped in development mode for easier testing.
    """
    if settings.ENVIRONMENT == "development":
        return  # Skip auth in development

    api_key = request.headers.get("X-Service-Key")

    if not api_key:
        logger.warning("Missing X-Service-Key header")
        raise HTTPException(status_code=401, detail="Missing service API key")

    if api_key != settings.SERVICE_API_KEY:
        logger.warning("Invalid X-Service-Key")
        raise HTTPException(status_code=403, detail="Invalid service API key")
