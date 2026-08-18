"""
Centralized configuration via Pydantic Settings.

Reads from .env file and environment variables.
All config is type-safe and validated at startup.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- Server ---
    PORT: int = 4000
    ENVIRONMENT: str = "development"
    SERVICE_API_KEY: str = ""

    # --- Google Gemini ---
    GOOGLE_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.0-flash"

    # --- Groq ---
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    # --- HuggingFace ---
    HUGGINGFACE_API_KEY: str = ""
    HUGGINGFACE_TEXT_MODEL: str = "mistralai/Mistral-7B-Instruct-v0.3"
    HUGGINGFACE_IMAGE_MODEL: str = "stabilityai/stable-diffusion-xl-base-1.0"

    # --- Ollama ---
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3"

    # --- Pollinations.ai ---
    POLLINATIONS_BASE_URL: str = "https://image.pollinations.ai"

    # --- Stability AI ---
    STABILITY_API_KEY: str = ""

    # --- Sentry ---
    SENTRY_DSN: str = ""

    # --- Logging ---
    LOG_LEVEL: str = "info"

    # --- CORS ---
    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]


settings = Settings()
