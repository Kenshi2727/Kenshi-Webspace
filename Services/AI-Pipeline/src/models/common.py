"""
Common/shared Pydantic models.
"""

from pydantic import BaseModel, Field
from enum import Enum


class TaskStatus(str, Enum):
    """Status of an async task."""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class ErrorResponse(BaseModel):
    """Standard error response."""

    error: str = Field(..., description="Error message")
    detail: str | None = Field(None, description="Detailed error information")
