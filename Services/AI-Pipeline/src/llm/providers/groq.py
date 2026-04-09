"""
Groq LLM Provider.

Fallback provider — uses Groq's free tier for fast inference.
Free limits: 30 RPM, 15k tokens/min.
"""

from langchain_groq import ChatGroq


class GroqProvider:
    """Groq provider using LangChain integration."""

    def __init__(self, api_key: str, model: str = "llama-3.3-70b-versatile"):
        self.name = f"groq/{model}"
        self.llm = ChatGroq(
            model=model,
            groq_api_key=api_key,
            temperature=0.7,
            max_tokens=4096,
        )

    async def invoke(self, prompt: str) -> str:
        """Send prompt to Groq and return the response text."""
        response = await self.llm.ainvoke(prompt)
        return response.content
