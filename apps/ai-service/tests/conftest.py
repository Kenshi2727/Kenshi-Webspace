"""
Pytest fixtures for AI Pipeline tests.
"""

import pytest
from fastapi.testclient import TestClient
from src.main import app


@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)


@pytest.fixture
def sample_blog_request():
    """Sample blog generation request for testing."""
    return {
        "topic": "Introduction to Python Type Hints",
        "category": "Technology",
        "tone": "educational",
        "target_length": "medium",
        "keywords": ["python", "type hints", "typing"],
        "generate_cover_image": False,
    }


@pytest.fixture
def sample_review_request():
    """Sample content review request for testing."""
    return {
        "title": "Getting Started with FastAPI",
        "content": "FastAPI is a modern, fast web framework for building APIs with Python. "
                   "It leverages Python type hints for automatic validation and documentation. "
                   "In this article, we'll explore the core concepts of FastAPI and build a simple API.",
        "category": "Technology",
    }
