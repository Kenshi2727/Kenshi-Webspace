"""
Ollama Local LLM Provider.

Emergency/development fallback — uses locally running Ollama.
Requires Ollama to be installed and running on the machine.
No API key needed. Unlimited usage.
"""

from langchain_community.chat_models import ChatOllama


class OllamaProvider:
    """Ollama local LLM provider using LangChain integration."""

    def __init__(self, base_url: str = "http://localhost:11434", model: str = "llama3"):
        self.name = f"ollama/{model}"
        self.llm = ChatOllama(
            base_url=base_url,
            model=model,
            temperature=0.7,
        )

    async def invoke(self, prompt: str) -> str:
        """Send prompt to local Ollama instance and return the response text."""
        response = await self.llm.ainvoke(prompt)
        return response.content
