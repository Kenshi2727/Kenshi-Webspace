"""
Health check endpoint.
"""

from fastapi import APIRouter
from src.config import settings

router = APIRouter()


@router.get("/health")
async def health_check():
    """Service health check — used by load balancers and monitoring."""
    return {
        "status": "healthy",
        "service": "kenshi-ai-pipeline",
        "version": "0.1.0",
        "environment": settings.ENVIRONMENT,
    }
