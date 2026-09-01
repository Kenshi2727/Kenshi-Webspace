"""
Main API router — mounts all versioned sub-routers.
"""

from fastapi import APIRouter

from src.api.v1.health import router as health_router
from src.api.v1.blog import router as blog_router
from src.api.v1.review import router as review_router
from src.api.v1.image import router as image_router

api_router = APIRouter()

# Health check (no version prefix)
api_router.include_router(health_router, tags=["Health"])

# V1 API routes
api_router.include_router(blog_router, prefix="/api/v1/blog", tags=["Blog Generation"])
api_router.include_router(review_router, prefix="/api/v1/review", tags=["Content Review"])
api_router.include_router(image_router, prefix="/api/v1/image", tags=["Image Generation"])
