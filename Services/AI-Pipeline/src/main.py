"""
Kenshi AI Pipeline — FastAPI Application Entry Point

Microservice for blog generation, content review/moderation,
and image generation for the Kenshi Webspace platform.
"""

import sentry_sdk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings
from src.api.router import api_router
from src.utils.logger import logger

# --- Sentry Initialization ---
if settings.SENTRY_DSN:
    sentry_sdk.init(
        dsn=settings.SENTRY_DSN,
        traces_sample_rate=0.2,
        environment=settings.ENVIRONMENT,
    )
    logger.info("Sentry initialized")


# --- FastAPI App ---
app = FastAPI(
    title="Kenshi AI Pipeline",
    description="AI-powered blog generation, content review, and image generation for Kenshi Webspace",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# --- Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routes ---
app.include_router(api_router)


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint — service identification."""
    return {
        "service": "Kenshi AI Pipeline",
        "version": "0.1.0",
        "status": "running",
        "docs": "/docs",
    }
