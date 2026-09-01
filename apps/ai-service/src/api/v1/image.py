"""
Image generation API endpoints.

Handles AI image generation using dedicated image models.
"""

from fastapi import APIRouter, HTTPException

from src.models.image import ImageRequest, ImageResponse, CoverImageRequest
from src.controllers.image_controller import (
    handle_generate_image,
    handle_generate_cover,
)

router = APIRouter()


@router.post("/generate", response_model=ImageResponse)
async def generate_image(request: ImageRequest):
    """
    Generate an image from a text prompt.

    Uses dedicated image generation models (Pollinations, HuggingFace SDXL,
    Stability AI) — separate from the text LLM chain.
    """
    try:
        result = await handle_generate_image(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image generation failed: {str(e)}")


@router.post("/cover", response_model=ImageResponse)
async def generate_cover_image(request: CoverImageRequest):
    """
    Generate a blog cover image with pre-configured dimensions (1200x630).

    Optimized for blog thumbnails and social media cards.
    """
    try:
        result = await handle_generate_cover(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cover image generation failed: {str(e)}")
