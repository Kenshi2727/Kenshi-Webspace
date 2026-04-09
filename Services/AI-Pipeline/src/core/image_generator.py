"""
Image Generation Pipeline.

Uses dedicated image generation models (separate from text LLMs).
Implements its own provider fallback chain for image-specific services.
"""

import time
from src.models.image import ImageRequest, ImageResponse
from src.image.provider_chain import ImageProviderChain
from src.utils.logger import logger


class ImageGenerator:
    """Generates images using dedicated image models with fallback."""

    def __init__(self):
        self.image_chain = ImageProviderChain()

    async def generate(self, request: ImageRequest) -> ImageResponse:
        """
        Generate an image from a text prompt.

        Uses the image provider fallback chain:
        Pollinations.ai → HuggingFace SDXL → Stability AI
        """
        start_time = time.time()

        image_url, model_used = await self.image_chain.generate(
            prompt=request.prompt,
            width=request.width,
            height=request.height,
            style=request.style,
        )

        elapsed_ms = int((time.time() - start_time) * 1000)

        response = ImageResponse(
            image_url=image_url,
            prompt_used=request.prompt,
            model_used=model_used,
            generation_time_ms=elapsed_ms,
        )

        logger.info(f"Image generated | model={model_used} | time={elapsed_ms}ms")
        return response
