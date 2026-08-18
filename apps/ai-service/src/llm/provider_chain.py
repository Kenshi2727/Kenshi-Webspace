"""
LLM Provider Fallback Chain.

Manages multiple LLM providers and automatically falls through
to the next provider if the current one fails or is rate-limited.

Fallback order:
  1. Gemini 2.0 Flash (free)
  2. Gemini 2.5 Flash (free)
  3. Groq - Llama 3 (free)
  4. HuggingFace Inference (free)
  5. Ollama (local, dev/emergency)
"""

from src.llm.providers.gemini import GeminiProvider
from src.llm.providers.groq import GroqProvider
from src.llm.providers.huggingface import HuggingFaceProvider
from src.llm.providers.ollama import OllamaProvider
from src.config import settings
from src.utils.logger import logger


class LLMProviderChain:
    """
    Manages LLM providers with automatic fallback.

    If a provider fails (rate limit, timeout, error), the chain
    automatically tries the next provider in priority order.
    """

    def __init__(self):
        self.providers = self._initialize_providers()

    def _initialize_providers(self) -> list:
        """Initialize available providers based on configured API keys."""
        providers = []

        if settings.GOOGLE_API_KEY:
            providers.append(GeminiProvider(
                api_key=settings.GOOGLE_API_KEY,
                model=settings.GEMINI_MODEL,
            ))
            logger.info(f"LLM Provider registered: Gemini ({settings.GEMINI_MODEL})")

        if settings.GROQ_API_KEY:
            providers.append(GroqProvider(
                api_key=settings.GROQ_API_KEY,
                model=settings.GROQ_MODEL,
            ))
            logger.info(f"LLM Provider registered: Groq ({settings.GROQ_MODEL})")

        if settings.HUGGINGFACE_API_KEY:
            providers.append(HuggingFaceProvider(
                api_key=settings.HUGGINGFACE_API_KEY,
                model=settings.HUGGINGFACE_TEXT_MODEL,
            ))
            logger.info(f"LLM Provider registered: HuggingFace ({settings.HUGGINGFACE_TEXT_MODEL})")

        # Ollama is always available as the last resort (local)
        providers.append(OllamaProvider(
            base_url=settings.OLLAMA_BASE_URL,
            model=settings.OLLAMA_MODEL,
        ))
        logger.info(f"LLM Provider registered: Ollama ({settings.OLLAMA_MODEL})")

        return providers

    async def invoke(self, prompt: str) -> tuple[str, str]:
        """
        Send a prompt through the provider chain.

        Tries each provider in order. If one fails, falls through to the next.

        Returns:
            tuple[str, str]: (response_text, model_name)

        Raises:
            RuntimeError: If all providers fail.
        """
        errors = []

        for provider in self.providers:
            try:
                logger.debug(f"Trying provider: {provider.name}")
                response = await provider.invoke(prompt)
                return response, provider.name
            except Exception as e:
                logger.warning(f"Provider {provider.name} failed: {str(e)}")
                errors.append(f"{provider.name}: {str(e)}")
                continue

        error_summary = " | ".join(errors)
        raise RuntimeError(f"All LLM providers failed: {error_summary}")
