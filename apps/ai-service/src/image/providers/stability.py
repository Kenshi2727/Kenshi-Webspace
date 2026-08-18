"""
Stability AI Image Provider.

Fallback image provider — uses Stability AI's API.
Limited free credits on signup (25 credits).
"""

import httpx
import base64


class StabilityProvider:
    """Stability AI image generation."""

    def __init__(self, api_key: str):
        self.name = "stability/sdxl"
        self.api_key = api_key
        self.api_url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"

    async def generate(
        self,
        prompt: str,
        width: int = 1024,
        height: int = 1024,
        style: str | None = None,
    ) -> str:
        """
        Generate an image via Stability AI API.

        Returns a data URL (base64) of the generated image.
        """
        full_prompt = f"{style} style: {prompt}" if style else prompt

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

        payload = {
            "text_prompts": [{"text": full_prompt, "weight": 1}],
            "cfg_scale": 7,
            "width": width,
            "height": height,
            "steps": 30,
            "samples": 1,
        }

        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(self.api_url, json=payload, headers=headers)

            if response.status_code != 200:
                raise Exception(f"Stability AI returned status {response.status_code}: {response.text}")

            data = response.json()
            b64_image = data["artifacts"][0]["base64"]
            return f"data:image/png;base64,{b64_image}"
