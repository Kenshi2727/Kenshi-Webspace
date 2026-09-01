# ============================================
# Kenshi AI Pipeline — Dockerfile
# For GCP Cloud Run deployment
# ============================================

FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install UV for fast dependency management
RUN pip install --no-cache-dir uv

# Copy dependency files first (layer caching)
COPY pyproject.toml ./

# Install dependencies
RUN uv pip install --system -r pyproject.toml

# Copy source code
COPY src/ ./src/

# Expose port (GCP Cloud Run uses 8080 by default)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8080/health')" || exit 1

# Start FastAPI with Uvicorn
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]
