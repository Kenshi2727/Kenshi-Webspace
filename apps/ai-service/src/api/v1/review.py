"""
Content review & moderation API endpoints.

Handles AI-powered blog review and content safety checks.
"""

from fastapi import APIRouter, HTTPException

from src.models.review import ReviewRequest, ReviewResult
from src.controllers.review_controller import (
    handle_evaluate_content,
    handle_get_rules,
)

router = APIRouter()


@router.post("/evaluate", response_model=ReviewResult)
async def evaluate_content(request: ReviewRequest):
    """
    Submit blog content for AI review and moderation.

    The AI evaluates the content against moderation rules (hate speech,
    sexual content, violence, etc.) and provides a quality score,
    readability score, and actionable suggestions.
    """
    try:
        result = await handle_evaluate_content(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Content review failed: {str(e)}")


@router.get("/rules")
async def get_moderation_rules():
    """Get the current content moderation rules and their severity levels."""
    return handle_get_rules()
