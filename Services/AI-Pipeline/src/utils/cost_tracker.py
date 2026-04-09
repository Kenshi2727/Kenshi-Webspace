"""
API cost and usage tracker.

Monitors API calls to each provider for cost awareness
and debugging rate limit issues.
"""

from datetime import datetime
from src.utils.logger import logger


class CostTracker:
    """Tracks API usage across providers for cost monitoring."""

    def __init__(self):
        self._usage: dict[str, dict] = {}

    def record_call(self, provider: str, tokens_used: int = 0, success: bool = True):
        """Record an API call to a provider."""
        if provider not in self._usage:
            self._usage[provider] = {
                "total_calls": 0,
                "successful_calls": 0,
                "failed_calls": 0,
                "total_tokens": 0,
                "last_call": None,
            }

        stats = self._usage[provider]
        stats["total_calls"] += 1
        stats["total_tokens"] += tokens_used
        stats["last_call"] = datetime.now().isoformat()

        if success:
            stats["successful_calls"] += 1
        else:
            stats["failed_calls"] += 1

        logger.debug(f"API call recorded | provider={provider} | success={success} | tokens={tokens_used}")

    def get_usage_summary(self) -> dict:
        """Get usage summary across all providers."""
        return {
            "providers": self._usage,
            "total_calls": sum(p["total_calls"] for p in self._usage.values()),
            "total_tokens": sum(p["total_tokens"] for p in self._usage.values()),
        }

    def reset(self):
        """Reset all usage counters."""
        self._usage = {}


# Global cost tracker instance
cost_tracker = CostTracker()
