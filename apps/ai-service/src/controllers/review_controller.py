"""
Content review controller.

Orchestrates AI content review and moderation.
"""

from src.models.review import ReviewRequest, ReviewResult
from src.core.content_reviewer import ContentReviewer
from src.core.moderation_rules import get_moderation_rules
from src.utils.logger import logger

content_reviewer = ContentReviewer()


async def handle_evaluate_content(request: ReviewRequest) -> ReviewResult:
    """Evaluate blog content against moderation rules and quality standards."""
    logger.info(f"Evaluating content: {request.title[:50]}...")

    result = await content_reviewer.evaluate(request)

    logger.info(f"Review complete | verdict={result.verdict} | score={result.score}")
    return result


def handle_get_rules() -> dict:
    """Return the current moderation rules."""
    rules = get_moderation_rules()
    return {"rules": rules}
