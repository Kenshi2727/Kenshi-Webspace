"""
Image generation controller.

Orchestrates image generation using dedicated image models.
"""

from src.models.image import ImageRequest, ImageResponse, CoverImageRequest
from src.core.image_generator import ImageGenerator
from src.utils.logger import logger

image_generator = ImageGenerator()

# Default cover image dimensions (optimized for blog/social cards)
COVER_WIDTH = 1200
COVER_HEIGHT = 630


async def handle_generate_image(request: ImageRequest) -> ImageResponse:
    """Generate an image from a text prompt."""
    logger.info(f"Generating image | prompt={request.prompt[:50]}...")

    result = await image_generator.generate(request)

    logger.info(f"Image generated | model={result.model_used} | time={result.generation_time_ms}ms")
    return result


async def handle_generate_cover(request: CoverImageRequest) -> ImageResponse:
    """Generate a blog cover image with optimized dimensions."""
    logger.info(f"Generating cover image | prompt={request.prompt[:50]}...")

    # Convert to standard ImageRequest with cover dimensions
    image_request = ImageRequest(
        prompt=request.prompt,
        style=request.style or "blog_cover",
        width=COVER_WIDTH,
        height=COVER_HEIGHT,
    )

    result = await image_generator.generate(image_request)

    logger.info(f"Cover image generated | model={result.model_used}")
    return result
