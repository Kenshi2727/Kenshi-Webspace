# Kenshi AI Pipeline

AI-powered microservice for the Kenshi Webspace platform. Handles blog generation, content review/moderation, and image generation using multiple free-tier AI models with automatic fallback.

## Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Blog Generation** | Generate complete blog drafts from a topic/prompt | 🔨 In Progress |
| **Content Review** | AI-powered content moderation with quality scoring | 📋 Planned |
| **Image Generation** | Cover image generation using dedicated image models | 📋 Planned |

## Tech Stack

- **Language:** Python 3.12+
- **Framework:** FastAPI
- **LLM Orchestration:** LangChain
- **Package Manager:** UV

## AI Provider Fallback Chains

### Text Generation
```
Gemini 2.0 Flash → Gemini 2.5 Flash → Groq (Llama 3) → HuggingFace → Ollama (local)
```

### Image Generation
```
Pollinations.ai → HuggingFace (SDXL) → Stability AI
```

## Quick Start

### Prerequisites
- Python 3.12+
- [UV](https://docs.astral.sh/uv/) (recommended) or pip

### Setup

```bash
# Navigate to the service directory
cd Services/AI-Pipeline

# Install dependencies with UV
uv sync

# Or with pip
pip install -e .

# Copy environment config
cp .env.example .env
# Edit .env with your API keys

# Start development server
uvicorn src.main:app --reload --port 4000
```

### API Documentation
Once running, visit:
- **Swagger UI:** http://localhost:4000/docs
- **ReDoc:** http://localhost:4000/redoc

## API Endpoints

### Blog Generation
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/blog/generate` | Generate complete blog draft |
| `POST` | `/api/v1/blog/titles` | Generate title suggestions |
| `POST` | `/api/v1/blog/excerpt` | Generate excerpt from content |

### Content Review
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/review/evaluate` | AI review of blog content |
| `GET` | `/api/v1/review/rules` | Get moderation rules |

### Image Generation
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/image/generate` | Generate image from prompt |
| `POST` | `/api/v1/image/cover` | Generate blog cover image |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Service health check |

## Project Structure

```
AI-Pipeline/
├── src/
│   ├── main.py              # FastAPI entry point
│   ├── config.py            # Environment configuration
│   ├── api/v1/              # API route handlers
│   ├── controllers/         # Request handling logic
│   ├── core/                # Business logic (generators, reviewers)
│   ├── llm/                 # Text LLM provider chain
│   ├── image/               # Image generation provider chain
│   ├── prompts/             # Prompt templates
│   ├── models/              # Pydantic data models
│   ├── middlewares/         # Auth & security
│   └── utils/               # Logger, cost tracker
├── tests/                   # Pytest test suite
├── pyproject.toml           # Dependencies & config
├── Dockerfile               # GCP Cloud Run deployment
└── .env.example             # Environment template
```

## Deployment

### GCP Cloud Run
```bash
# Build and deploy
gcloud run deploy kenshi-ai-pipeline \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

## Integration

This service communicates with the main Node.js Server via REST API:
```
Node.js Server (Express) ←→ AI Pipeline (FastAPI)
                              ↓
                        Returns structured JSON
                              ↓
                     Server persists to PostgreSQL
```

## License

Apache-2.0