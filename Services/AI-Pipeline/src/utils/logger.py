"""
Structured logger for the AI Pipeline.

Provides consistent, structured log output across the service.
"""

import logging
import sys

from src.config import settings


def setup_logger(name: str = "kenshi-ai-pipeline") -> logging.Logger:
    """Create and configure the application logger."""
    _logger = logging.getLogger(name)

    # Set log level from config
    level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)
    _logger.setLevel(level)

    # Console handler with structured format
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(level)

    formatter = logging.Formatter(
        fmt="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    handler.setFormatter(formatter)

    # Avoid duplicate handlers
    if not _logger.handlers:
        _logger.addHandler(handler)

    return _logger


logger = setup_logger()
