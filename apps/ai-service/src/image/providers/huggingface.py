"""
HuggingFace Inference API Image Provider.

Fallback image provider — uses HuggingFace's free Inference API
for image generation with models like Stable Diffusion XL.
"""

import httpx
import base64


class HuggingFaceImageProvider:
    """HuggingFace Inference API image generation."""

    def __init__(self, api_key: str, model: str = "stabilityai/stable-diffusion-xl-base-1.0"):
        self.name = f"huggingface/{model.split('/')[-1]}"
        self.api_key = api_key
        self.model = model
        self.api_url = f"https://api-inference.huggingface.co/models/{model}"

    async def generate(
        self,
        prompt: str,
        width: int = 1024,
        height: int = 1024,
        style: str | None = None,
    ) -> str:
        """
        Generate an image via HuggingFace Inference API.

        Returns a data URL (base64) of the generated image.
        """
        full_prompt = f"{style} style: {prompt}" if style else prompt

        headers = {"Authorization": f"Bearer {self.api_key}"}
        payload = {
            "inputs": full_prompt,
            "parameters": {
                "width": width,
                "height": height,
            },
        }

        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(self.api_url, json=payload, headers=headers)

            if response.status_code != 200:
                raise Exception(f"HuggingFace returned status {response.status_code}: {response.text}")

            # Response is raw image bytes
            image_bytes = response.content
            b64_image = base64.b64encode(image_bytes).decode("utf-8")
            return f"data:image/png;base64,{b64_image}"
