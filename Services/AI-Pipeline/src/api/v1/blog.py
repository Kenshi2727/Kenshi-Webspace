"""
Blog generation API endpoints.

Handles blog content creation from topic/prompt input.
"""

from fastapi import APIRouter, HTTPException

from src.models.blog import BlogRequest, BlogDraft, TitleRequest, ExcerptRequest
from src.controllers.blog_controller import (
    handle_generate_blog,
    handle_generate_titles,
    handle_generate_excerpt,
)

router = APIRouter()


@router.post("/generate", response_model=BlogDraft)
async def generate_blog(request: BlogRequest):
    """
    Generate a complete blog draft from a topic/prompt.

    Returns structured content including title, excerpt, full markdown body,
    read time, SEO keywords, and optionally a cover image.
    """
    try:
        result = await handle_generate_blog(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Blog generation failed: {str(e)}")


@router.post("/titles")
async def generate_titles(request: TitleRequest):
    """Generate title suggestions for a given topic."""
    try:
        result = await handle_generate_titles(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Title generation failed: {str(e)}")


@router.post("/excerpt")
async def generate_excerpt(request: ExcerptRequest):
    """Generate an excerpt/summary from blog content."""
    try:
        result = await handle_generate_excerpt(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Excerpt generation failed: {str(e)}")
