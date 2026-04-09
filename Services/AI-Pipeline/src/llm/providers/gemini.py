"""
Google Gemini LLM Provider.

Primary provider — uses the free tier of Gemini 2.0 Flash.
Free limits: 15 RPM, 1M TPM.
"""

from langchain_google_genai import ChatGoogleGenerativeAI


class GeminiProvider:
    """Google Gemini provider using LangChain integration."""

    def __init__(self, api_key: str, model: str = "gemini-2.0-flash"):
        self.name = f"gemini/{model}"
        self.llm = ChatGoogleGenerativeAI(
            model=model,
            google_api_key=api_key,
            temperature=0.7,
            max_output_tokens=4096,
        )

    async def invoke(self, prompt: str) -> str:
        """Send prompt to Gemini and return the response text."""
        response = await self.llm.ainvoke(prompt)
        return response.content
