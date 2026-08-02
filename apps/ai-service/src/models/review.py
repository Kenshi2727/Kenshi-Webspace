"""
Content review Pydantic models.

Defines request/response schemas for the AI review & moderation system.
"""

from pydantic import BaseModel, Field
from enum import Enum


class Verdict(str, Enum):
    """Review verdict options."""
    APPROVE = "approve"
    REJECT = "reject"
    NEEDS_REVIEW = "needs_review"


class Severity(str, Enum):
    """Violation severity levels."""
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class Violation(BaseModel):
    """A single content policy violation found during review."""

    category: str = Field(..., description="Violation category (e.g., hate_speech, sexual_content)")
    severity: Severity = Field(..., description="Severity level")
    excerpt: str = Field("", description="Excerpt from the content that triggered the violation")
    explanation: str = Field("", description="Explanation of why this is a violation")


class ReviewRequest(BaseModel):
    """Request schema for content review."""

    title: str = Field(..., description="Blog post title")
    content: str = Field(..., description="Full blog content to review", min_length=10)
    category: str | None = Field(None, description="Blog category for context")


class ReviewResult(BaseModel):
    """Response schema for content review results."""

    verdict: Verdict = Field(..., description="Overall review verdict")
    score: int = Field(..., description="Quality score 0-100", ge=0, le=100)
    violations: list[Violation] = Field(default_factory=list, description="Content policy violations found")
    suggestions: list[str] = Field(default_factory=list, description="Improvement suggestions")
    readability_score: int = Field(0, description="Readability score 0-100", ge=0, le=100)
    seo_score: int = Field(0, description="SEO optimization score 0-100", ge=0, le=100)
    model_used: str = Field(..., description="LLM model used for review")
    review_time_ms: int = Field(..., description="Review processing time in milliseconds")
