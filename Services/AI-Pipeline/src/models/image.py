"""
Image generation Pydantic models.

Defines request/response schemas for image generation endpoints.
"""

from pydantic import BaseModel, Field


class ImageRequest(BaseModel):
    """Request schema for generating an image."""

    prompt: str = Field(..., description="Text prompt describing the desired image", min_length=3)
    style: str | None = Field(None, description="Image style (e.g., blog_cover, illustration, photo)")
    width: int = Field(1024, description="Image width in pixels", ge=256, le=2048)
    height: int = Field(1024, description="Image height in pixels", ge=256, le=2048)


class CoverImageRequest(BaseModel):
    """Request schema for generating a blog cover image (preset dimensions)."""

    prompt: str = Field(..., description="Text prompt for the cover image", min_length=3)
    style: str | None = Field("blog_cover", description="Cover image style")


class ImageResponse(BaseModel):
    """Response schema for generated images."""

    image_url: str = Field(..., description="URL or data URL of the generated image")
    prompt_used: str = Field(..., description="The prompt that was used for generation")
    model_used: str = Field(..., description="Image model that generated the image")
    generation_time_ms: int = Field(..., description="Generation time in milliseconds")
