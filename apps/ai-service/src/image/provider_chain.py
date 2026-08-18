"""
Image Provider Fallback Chain.

Manages multiple image generation providers with automatic fallback.

Fallback order:
  1. Pollinations.ai (free, no API key)
  2. HuggingFace Inference (free tier, SDXL)
  3. Stability AI (limited free credits)
"""

from src.image.providers.pollinations import PollinationsProvider
from src.image.providers.huggingface import HuggingFaceImageProvider
from src.image.providers.stability import StabilityProvider
from src.config import settings
from src.utils.logger import logger


class ImageProviderChain:
    """
    Manages image generation providers with automatic fallback.

    If a provider fails, the chain automatically tries the next
    provider in priority order.
    """

    def __init__(self):
        self.providers = self._initialize_providers()

    def _initialize_providers(self) -> list:
        """Initialize available image providers."""
        providers = []

        # Pollinations is always available (no API key needed)
        providers.append(PollinationsProvider(
            base_url=settings.POLLINATIONS_BASE_URL,
        ))
        logger.info("Image Provider registered: Pollinations.ai")

        if settings.HUGGINGFACE_API_KEY:
            providers.append(HuggingFaceImageProvider(
                api_key=settings.HUGGINGFACE_API_KEY,
                model=settings.HUGGINGFACE_IMAGE_MODEL,
            ))
            logger.info(f"Image Provider registered: HuggingFace ({settings.HUGGINGFACE_IMAGE_MODEL})")

        if settings.STABILITY_API_KEY:
            providers.append(StabilityProvider(
                api_key=settings.STABILITY_API_KEY,
            ))
            logger.info("Image Provider registered: Stability AI")

        return providers

    async def generate(
        self,
        prompt: str,
        width: int = 1024,
        height: int = 1024,
        style: str | None = None,
    ) -> tuple[str, str]:
        """
        Generate an image through the provider chain.

        Returns:
            tuple[str, str]: (image_url, model_name)

        Raises:
            RuntimeError: If all providers fail.
        """
        errors = []

        for provider in self.providers:
            try:
                logger.debug(f"Trying image provider: {provider.name}")
                image_url = await provider.generate(prompt, width, height, style)
                return image_url, provider.name
            except Exception as e:
                logger.warning(f"Image provider {provider.name} failed: {str(e)}")
                errors.append(f"{provider.name}: {str(e)}")
                continue

        error_summary = " | ".join(errors)
        raise RuntimeError(f"All image providers failed: {error_summary}")
