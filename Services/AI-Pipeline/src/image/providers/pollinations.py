"""
Pollinations.ai Image Provider.

Primary image provider — completely free, no API key required.
Supports Flux and other models via URL-based generation.

Usage: GET https://image.pollinations.ai/prompt/{encoded_prompt}?width=W&height=H
"""

from urllib.parse import quote
import httpx


class PollinationsProvider:
    """Pollinations.ai image generation — free, no API key."""

    def __init__(self, base_url: str = "https://image.pollinations.ai"):
        self.name = "pollinations/flux"
        self.base_url = base_url

    async def generate(
        self,
        prompt: str,
        width: int = 1024,
        height: int = 1024,
        style: str | None = None,
    ) -> str:
        """
        Generate an image URL via Pollinations.ai.

        Pollinations returns the image directly at the URL,
        so we construct the URL and verify it's accessible.
        """
        # Enhance prompt with style if provided
        full_prompt = f"{style} style: {prompt}" if style else prompt

        # Construct the image URL
        encoded_prompt = quote(full_prompt)
        image_url = f"{self.base_url}/prompt/{encoded_prompt}?width={width}&height={height}&nologo=true"

        # Verify the URL is accessible
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.head(image_url)
            if response.status_code >= 400:
                raise Exception(f"Pollinations returned status {response.status_code}")

        return image_url
