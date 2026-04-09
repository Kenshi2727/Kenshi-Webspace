"""
Tests for the health check and root endpoints.
"""


def test_root_endpoint(client):
    """Test that the root endpoint returns service info."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "Kenshi AI Pipeline"
    assert data["status"] == "running"


def test_health_endpoint(client):
    """Test that the health endpoint returns healthy status."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "kenshi-ai-pipeline"
