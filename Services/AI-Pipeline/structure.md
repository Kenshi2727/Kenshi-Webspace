# AI Pipeline — Project Structure Guide

This document explains **every file and directory** in the AI Pipeline service so you can understand what each piece does, why it exists, and how they connect together.

---

## Architecture Overview

The AI Pipeline follows a **layered architecture**. Each layer has a single responsibility:

```
Request Flow:

  Client (or Node.js Server)
        │
        ▼
  ┌─────────────┐
  │  API Layer   │   ← Receives HTTP requests, validates input
  │  (routes)    │
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ Controllers  │   ← Orchestrates logic, calls core services
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │    Core      │   ← Business logic (blog generator, reviewer, image gen)
  └──────┬──────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│  LLM  │ │ Image │   ← Provider chains that talk to external AI APIs
│ Chain │ │ Chain │
└───────┘ └───────┘
```

**Why layers?** So you can change one layer without breaking others. For example, you can swap Gemini for a new AI provider without touching the API routes or controllers.

---

## Root Files

### `pyproject.toml`
**What:** The project configuration file — Python's equivalent of `package.json`.

**What's inside:**
- **Project metadata** — name, version, description, author, license
- **Dependencies** — all Python packages this project needs (FastAPI, LangChain, httpx, etc.)
- **Dev dependencies** — packages only needed during development (pytest, ruff linter, pyright)
- **Tool configs** — settings for Ruff (linter), Pytest (testing), Pyright (type checking)

**When you touch it:** When adding a new dependency, changing project metadata, or modifying linter/test settings.

---

### `README.md`
**What:** The front page documentation for anyone visiting this service.

**What's inside:** Quick start instructions, API endpoint reference, project structure overview, deployment guide.

**When you touch it:** When adding new features, endpoints, or changing setup instructions.

---

### `model_plan.md`
**What:** Your original architectural planning document (pre-existing, preserved).

**What's inside:** The AI model routing strategy — cheap vs paid vs local models, monolith vs microservice comparison, migration plan.

**When you touch it:** When revisiting the overall AI strategy.

---

### `.env.example`
**What:** A template of all environment variables the service needs. Never contains real secrets.

**What's inside:**
- API keys placeholders for Gemini, Groq, HuggingFace, Stability AI, Ollama
- Server config (port, environment)
- Service-to-service auth key
- Sentry DSN

**How to use:** Copy to `.env` and fill in your real values:
```bash
cp .env.example .env
```

**When you touch it:** When adding a new config variable (e.g., a new AI provider key).

---

### `.gitignore`
**What:** Tells Git which files/folders to never commit.

**What's ignored:**
- `__pycache__/` — Python's compiled bytecode cache
- `.venv/` — Virtual environment (local to your machine)
- `.env` — Your real secrets (never commit this!)
- `.pytest_cache/` — Test runner cache
- `*.log` — Log files
- `.image_cache/` — Locally cached generated images

---

### `Dockerfile`
**What:** Instructions for building a Docker container to deploy on GCP Cloud Run.

**How it works (step by step):**
1. Starts from `python:3.12-slim` (lightweight Python image)
2. Installs UV (fast package manager)
3. Copies `pyproject.toml` and installs dependencies (cached layer — only re-runs if deps change)
4. Copies source code
5. Exposes port 8080 (GCP Cloud Run's default)
6. Adds a health check that pings `/health`
7. Starts Uvicorn (the ASGI server that runs FastAPI)

**When you touch it:** When changing deployment config, adding system dependencies, or optimizing the image.

---

### `structure.md`
**What:** This file. You're reading it right now.

---

## `src/` — Application Source Code

### `src/__init__.py`
**What:** Makes `src/` a Python package. Allows `from src.config import settings` style imports.

**Contents:** Empty (just a comment). Every Python directory needs this file to be importable.

---

### `src/main.py`
**What:** The application entry point — where everything starts.

**What it does:**
1. **Initializes Sentry** — error monitoring (if `SENTRY_DSN` is configured)
2. **Creates the FastAPI app** — with title, description, and docs URLs
3. **Adds CORS middleware** — allows the Client/Server to call this service across origins
4. **Mounts the API router** — connects all route files to the app
5. **Defines the root endpoint** (`GET /`) — returns service identification info

**This is what Uvicorn runs:**
```bash
uvicorn src.main:app --reload --port 4000
#        ^^^^^^^^     ^^^
#        module path   the FastAPI instance variable
```

---

### `src/config.py`
**What:** Centralized configuration — loads all env variables into a typed Python object.

**How it works:**
- Uses `pydantic-settings` to create a `Settings` class
- Each class attribute = one environment variable
- Every attribute has a **type** (str, int, list) and a **default value**
- Pydantic automatically reads from `.env` file and validates types
- If a required variable is missing or has the wrong type, the app crashes at startup (fail-fast)

**How you use it everywhere:**
```python
from src.config import settings

print(settings.GOOGLE_API_KEY)     # Your Gemini key
print(settings.PORT)                # 4000
print(settings.ALLOWED_ORIGINS)     # ["http://localhost:5173", ...]
```

**When you touch it:** When adding a new env variable (e.g., a new AI provider).

---

## `src/api/` — API Layer (HTTP Endpoints)

This layer is the **front door** of the service. It receives HTTP requests, validates them using Pydantic models, calls the appropriate controller, and returns the response.

### `src/api/__init__.py`
Package init. Empty.

### `src/api/router.py`
**What:** The **main router** that connects all sub-routers together.

**What it does:**
- Imports all v1 route files (blog, review, image, health)
- Mounts them under their URL prefixes:
  - `/health` — no version prefix (health checks should be simple)
  - `/api/v1/blog/*` — blog generation endpoints
  - `/api/v1/review/*` — content review endpoints
  - `/api/v1/image/*` — image generation endpoints
- Adds tags for Swagger UI grouping

**Why a separate router?** So `main.py` stays clean. You just do `app.include_router(api_router)` and all routes are connected.

**Why `/api/v1/`?** API versioning. If you ever need breaking changes, you can add `/api/v2/` without breaking existing clients.

---

### `src/api/v1/` — Version 1 Endpoints

#### `src/api/v1/__init__.py`
Package init. Empty.

#### `src/api/v1/health.py`
**What:** Health check endpoint.

**Endpoint:** `GET /health`

**What it returns:**
```json
{
  "status": "healthy",
  "service": "kenshi-ai-pipeline",
  "version": "0.1.0",
  "environment": "development"
}
```

**Who calls it:**
- GCP Cloud Run (to know if the container is alive)
- Docker health checks
- Load balancers
- Monitoring tools
- You, to check if the service is running

---

#### `src/api/v1/blog.py`
**What:** Blog generation endpoints.

**Endpoints:**
| Endpoint | What it does |
|----------|-------------|
| `POST /api/v1/blog/generate` | Takes a topic → returns a complete blog draft (title, content, excerpt, read time, SEO keywords) |
| `POST /api/v1/blog/titles` | Takes a topic → returns multiple title suggestions |
| `POST /api/v1/blog/excerpt` | Takes blog content → returns a short excerpt/summary |

**How it works:**
1. FastAPI receives the request and validates it using Pydantic models (`BlogRequest`, `TitleRequest`, `ExcerptRequest`)
2. Calls the corresponding controller function
3. The controller returns structured data
4. FastAPI serializes it to JSON and sends the response
5. If anything fails, catches the error and returns HTTP 500

---

#### `src/api/v1/review.py`
**What:** Content review and moderation endpoints.

**Endpoints:**
| Endpoint | What it does |
|----------|-------------|
| `POST /api/v1/review/evaluate` | Takes a blog post → AI reviews it for quality and safety → returns verdict (approve/reject/needs_review), scores, violations, and suggestions |
| `GET /api/v1/review/rules` | Returns the current moderation rules (what gets flagged/rejected) |

---

#### `src/api/v1/image.py`
**What:** Image generation endpoints.

**Endpoints:**
| Endpoint | What it does |
|----------|-------------|
| `POST /api/v1/image/generate` | Takes a text prompt → returns a generated image URL |
| `POST /api/v1/image/cover` | Takes a prompt → returns a blog cover image (preset 1200×630 dimensions) |

**Why separate from blog?** Image generation uses entirely different models (Pollinations, Stable Diffusion) than text generation (Gemini, Groq). Keeping them separate allows independent fallback chains.

---

## `src/controllers/` — Controller Layer

Controllers sit between routes and core logic. They:
1. Receive validated data from routes
2. Call the appropriate core service
3. Add logging
4. Return the result

**Why not put this logic directly in routes?** Separation of concerns. Routes handle HTTP (request/response). Controllers handle orchestration. This makes testing easier — you can test controllers without HTTP.

### `src/controllers/__init__.py`
Package init. Empty.

### `src/controllers/blog_controller.py`
**What:** Handles blog generation requests.

**Functions:**
- `handle_generate_blog(request)` — Creates a `BlogGenerator` instance, calls `generate()`, logs the result
- `handle_generate_titles(request)` — Generates title suggestions
- `handle_generate_excerpt(request)` — Generates an excerpt from content

---

### `src/controllers/review_controller.py`
**What:** Handles content review requests.

**Functions:**
- `handle_evaluate_content(request)` — Creates a `ContentReviewer`, calls `evaluate()`, logs verdict
- `handle_get_rules()` — Returns moderation rules from `moderation_rules.py`

---

### `src/controllers/image_controller.py`
**What:** Handles image generation requests.

**Functions:**
- `handle_generate_image(request)` — Calls `ImageGenerator.generate()` with the user's prompt
- `handle_generate_cover(request)` — Converts `CoverImageRequest` to `ImageRequest` with preset 1200×630 dimensions, then generates

---

## `src/core/` — Core Business Logic

This is where the **real work** happens. Core modules contain the AI pipeline logic — they don't know about HTTP, routes, or FastAPI. They just take input and produce output.

### `src/core/__init__.py`
Package init. Empty.

### `src/core/blog_generator.py`
**What:** The blog generation pipeline — the heart of the service.

**Class:** `BlogGenerator`

**How `generate()` works (step by step):**
1. Starts a timer
2. Builds a prompt from the `BlogRequest` using the prompt template
3. Sends the prompt through the **LLM Provider Chain** (which handles fallback automatically)
4. Gets back the raw text response + which model was used
5. Calculates read time from word count (200 words/minute average)
6. Packages everything into a `BlogDraft` Pydantic model
7. Returns the draft

**Current TODOs:**
- Structured output parsing (so the LLM returns JSON, not just text)
- Multi-step generation (outline → sections → assembly)
- Cover image auto-generation

---

### `src/core/content_reviewer.py`
**What:** AI-powered content review engine.

**Class:** `ContentReviewer`

**How `evaluate()` works:**
1. Builds a review prompt with the blog content + moderation rules
2. Sends to the LLM Provider Chain
3. Parses the structured response (verdict, score, violations, suggestions)
4. Returns a `ReviewResult`

**The AI is told to:**
- **Reject** posts with sexual content, hate speech, racism, violence
- **Flag** posts with misinformation, spam, plagiarism indicators, personal data
- **Score** quality (0-100), readability (0-100), and SEO (0-100)
- Provide **actionable suggestions** for improvement

---

### `src/core/image_generator.py`
**What:** Image generation pipeline using dedicated image models.

**Class:** `ImageGenerator`

**How `generate()` works:**
1. Starts a timer
2. Sends the prompt to the **Image Provider Chain** (separate from the LLM chain)
3. Gets back an image URL + which model was used
4. Returns an `ImageResponse`

---

### `src/core/moderation_rules.py`
**What:** The content policy — defines what's allowed and what's not.

**Contains:** A list of 7 moderation rules, each with:
- `category` — machine-readable name (e.g., `sexual_content`)
- `label` — human-readable name (e.g., "Sexual Content")
- `description` — detailed explanation of what counts as a violation
- `severity` — `critical`, `high`, or `medium`
- `action` — `reject` (block immediately) or `flag` (needs human review)

**The 7 rules:**

| # | Category | Severity | Action |
|---|----------|----------|--------|
| 1 | Sexual Content | 🔴 Critical | Reject |
| 2 | Hate Speech & Racism | 🔴 Critical | Reject |
| 3 | Violence & Harm | 🔴 Critical | Reject |
| 4 | Misinformation | 🟡 High | Flag |
| 5 | Spam / Low Quality | 🟡 High | Flag |
| 6 | Plagiarism Indicators | 🟠 Medium | Flag |
| 7 | Personal Data Exposure | 🟠 Medium | Flag |

**When you touch it:** When adding new rules or adjusting severity/actions.

---

## `src/llm/` — Text LLM Provider Chain

This module manages **which AI model to use for text generation** and handles automatic fallback if one fails.

### `src/llm/__init__.py`
Package init. Empty.

### `src/llm/provider_chain.py`
**What:** The fallback chain manager — the brain of the multi-model strategy.

**Class:** `LLMProviderChain`

**Fallback order:**
```
1. Gemini 2.0 Flash  (if GOOGLE_API_KEY is set)
2. Groq / Llama 3    (if GROQ_API_KEY is set)
3. HuggingFace       (if HUGGINGFACE_API_KEY is set)
4. Ollama            (always available — local, no key needed)
```

**How `invoke(prompt)` works:**
1. Loops through providers in priority order
2. Tries the first provider — if it succeeds, returns the response + model name
3. If it fails (rate limit, timeout, error), logs a warning and tries the **next** provider
4. If ALL providers fail, raises `RuntimeError` with a summary of all errors

**How `_initialize_providers()` works:**
- Checks which API keys are configured in `.env`
- Only registers providers that have valid keys
- Ollama is always added as the last resort (no key needed)
- Logs which providers are registered at startup

**This is what makes the "$0 cost" strategy work** — if Gemini's free tier is rate-limited, Groq takes over automatically, with zero code changes needed.

---

### `src/llm/providers/` — Individual LLM Providers

Each file wraps one AI provider with a consistent interface. They all have:
- A `name` property (e.g., `"gemini/gemini-2.0-flash"`)
- An `async invoke(prompt) → str` method

#### `src/llm/providers/__init__.py`
Package init. Empty.

#### `src/llm/providers/gemini.py`
**What:** Google Gemini integration via LangChain.

**Provider:** `langchain-google-genai`
**Free tier:** 15 RPM (requests per minute), 1M TPM (tokens per minute)
**Config:** Uses `GOOGLE_API_KEY` and `GEMINI_MODEL` from settings.

**How it works:**
- Creates a `ChatGoogleGenerativeAI` instance from LangChain
- `invoke()` calls `self.llm.ainvoke(prompt)` (async) and returns `response.content`

---

#### `src/llm/providers/groq.py`
**What:** Groq integration — extremely fast inference on Llama/Mistral models.

**Provider:** `langchain-groq`
**Free tier:** 30 RPM, 15k tokens/min
**Config:** Uses `GROQ_API_KEY` and `GROQ_MODEL`.

---

#### `src/llm/providers/huggingface.py`
**What:** HuggingFace Inference API — access to many open-source models.

**Provider:** `langchain-huggingface`
**Free tier:** Rate-limited but no hard cap
**Config:** Uses `HUGGINGFACE_API_KEY` and `HUGGINGFACE_TEXT_MODEL`.

**Note:** Uses `HuggingFaceEndpoint` + `ChatHuggingFace` — this is LangChain's recommended way to use HF Inference API for chat-style interactions.

---

#### `src/llm/providers/ollama.py`
**What:** Ollama local model — runs on your machine, no API key.

**Provider:** `langchain-community` (ChatOllama)
**Free tier:** Unlimited — it's YOUR hardware
**Config:** Uses `OLLAMA_BASE_URL` (default: `http://localhost:11434`) and `OLLAMA_MODEL`.

**Requirements:** [Ollama](https://ollama.com/) must be installed and running on your machine. Pull a model first:
```bash
ollama pull llama3
```

**Best for:** Development, testing, and emergency fallback when all APIs are down.

---

## `src/image/` — Image Generation Provider Chain

Same architecture as the LLM chain, but for **image generation models**. Completely separate — different models, different providers, different fallback order.

### `src/image/__init__.py`
Package init. Empty.

### `src/image/provider_chain.py`
**What:** Image provider fallback chain manager.

**Class:** `ImageProviderChain`

**Fallback order:**
```
1. Pollinations.ai   (always available — no API key needed)
2. HuggingFace SDXL  (if HUGGINGFACE_API_KEY is set)
3. Stability AI      (if STABILITY_API_KEY is set)
```

**How `generate()` works:**
Same pattern as the LLM chain — tries providers in order, falls back on failure.

**Key difference from LLM chain:** Returns an `image_url` (string) instead of text.

---

### `src/image/providers/` — Individual Image Providers

#### `src/image/providers/__init__.py`
Package init. Empty.

#### `src/image/providers/pollinations.py`
**What:** Pollinations.ai — completely free image generation, no API key.

**How it works:**
- Constructs a URL: `https://image.pollinations.ai/prompt/{encoded_prompt}?width=W&height=H`
- Makes a HEAD request to verify the URL works
- Returns the URL directly (the image is generated on-demand when the URL is accessed)

**Why it's the primary:** Zero cost, no rate limits, no API key. The image is generated when the URL is fetched, so no storage needed.

---

#### `src/image/providers/huggingface.py`
**What:** HuggingFace Inference API for Stable Diffusion XL.

**How it works:**
- POSTs the prompt to `https://api-inference.huggingface.co/models/{model}`
- Response is raw image bytes
- Converts to base64 data URL: `data:image/png;base64,...`

**Why base64?** So the caller can use it directly in an `<img>` tag without needing to host the image separately.

---

#### `src/image/providers/stability.py`
**What:** Stability AI — high-quality SDXL generation with limited free credits.

**How it works:**
- POSTs a structured request to Stability AI's REST API
- Receives base64-encoded image in the response
- Returns as data URL

**Note:** Only 25 free credits on signup. Use as last resort.

---

## `src/prompts/` — Prompt Templates

Each file contains a **prompt builder function** that constructs the exact text sent to the AI model. This is where prompt engineering happens.

**Why separate files?** So you can iterate on prompts without touching any logic code. Each prompt is a function that takes parameters and returns a string.

### `src/prompts/__init__.py`
Package init. Empty.

### `src/prompts/blog_full.py`
**What:** The main blog generation prompt.

**Function:** `get_blog_generation_prompt(topic, category, tone, target_length, keywords)`

**What the prompt tells the AI:**
- "You are a professional blog writer for Kenshi Webspace"
- Write about the given topic in markdown format
- Use the specified tone (educational, casual, professional, storytelling)
- Target the specified length (short ~500, medium ~1000, long ~2000 words)
- Include compelling intro, clear headings, examples, and strong conclusion
- Naturally incorporate the provided SEO keywords
- "Output markdown only — no preamble or meta-commentary"

---

### `src/prompts/blog_title.py`
**What:** Generates multiple title suggestions.

**Function:** `get_title_generation_prompt(topic, count)`

**What the prompt tells the AI:**
- Generate exactly N title options
- Mix styles: how-to, listicle, question, statement, provocative
- SEO-friendly (60-70 characters)
- No clickbait

---

### `src/prompts/blog_excerpt.py`
**What:** Generates a concise excerpt/summary.

**Function:** `get_excerpt_generation_prompt(content, max_length)`

**Smart detail:** Truncates the input content to 3000 chars before sending to the AI — saves tokens when the blog is very long.

---

### `src/prompts/content_review.py`
**What:** The moderation + review prompt.

**Function:** `get_content_review_prompt(title, content, category, rules)`

**What the prompt tells the AI:**
- "You are a content moderator for Kenshi Webspace"
- Here are the moderation rules (dynamically injected from `moderation_rules.py`)
- Evaluate the blog against these rules
- Return structured JSON with verdict, scores, violations, and suggestions
- "Be strict on critical violations — always reject"
- "Be fair but constructive on quality"

This is the most complex prompt — it includes the full moderation ruleset and requests structured JSON output.

---

### `src/prompts/image_prompt.py`
**What:** Generates optimized prompts for image models.

**Function:** `get_image_prompt_template(topic, style)`

**Style presets:**
- `blog_cover` — clean, professional with subtle gradients
- `illustration` — detailed, vibrant colors
- `photo` — photorealistic stock photo style
- `minimalist` — flat design, geometric, muted colors
- `tech` — futuristic, circuit patterns, glowing elements

---

## `src/models/` — Pydantic Data Models

These define the **shape of data** flowing through the system. They serve three purposes:
1. **Input validation** — reject malformed requests before processing
2. **Output serialization** — ensure responses have consistent structure
3. **Documentation** — auto-generate Swagger docs from field descriptions

### `src/models/__init__.py`
Package init. Empty.

### `src/models/blog.py`
**What:** Data models for blog generation.

**Models:**
| Model | Used For | Key Fields |
|-------|----------|------------|
| `BlogRequest` | Input to `/blog/generate` | `topic`, `category`, `tone`, `target_length`, `keywords`, `generate_cover_image` |
| `BlogDraft` | Output from `/blog/generate` | `title`, `excerpt`, `category`, `content`, `read_time`, `suggested_titles`, `seo_keywords`, `cover_image_url`, `model_used`, `generation_time_ms` |
| `TitleRequest` | Input to `/blog/titles` | `topic`, `count` (default 5, max 10) |
| `ExcerptRequest` | Input to `/blog/excerpt` | `content`, `max_length` (default 160) |

**Prisma mapping:** `BlogDraft` fields directly map to the `Post` model in your Prisma schema:
- `title` → `Post.title`
- `excerpt` → `Post.excerpt`
- `content` → `Post.content`
- `read_time` → `Post.readTime`
- `category` → `Post.category`

---

### `src/models/review.py`
**What:** Data models for content review.

**Models:**
| Model | Used For | Key Fields |
|-------|----------|------------|
| `ReviewRequest` | Input to `/review/evaluate` | `title`, `content`, `category` |
| `ReviewResult` | Output from `/review/evaluate` | `verdict`, `score`, `violations[]`, `suggestions[]`, `readability_score`, `seo_score` |
| `Violation` | Individual violation in results | `category`, `severity`, `excerpt`, `explanation` |

**Enums:**
- `Verdict` — `approve`, `reject`, `needs_review`
- `Severity` — `critical`, `high`, `medium`, `low`

---

### `src/models/image.py`
**What:** Data models for image generation.

**Models:**
| Model | Used For | Key Fields |
|-------|----------|------------|
| `ImageRequest` | Input to `/image/generate` | `prompt`, `style`, `width`, `height` |
| `CoverImageRequest` | Input to `/image/cover` | `prompt`, `style` (simpler — dimensions are preset) |
| `ImageResponse` | Output from both endpoints | `image_url`, `prompt_used`, `model_used`, `generation_time_ms` |

---

### `src/models/common.py`
**What:** Shared models used across features.

**Models:**
- `TaskStatus` — enum for async task tracking (`pending`, `processing`, `completed`, `failed`). Used in future when we add async/queued generation.
- `ErrorResponse` — standard error format with `error` and `detail` fields.

---

## `src/middlewares/` — Middleware

### `src/middlewares/__init__.py`
Package init. Empty.

### `src/middlewares/service_auth.py`
**What:** Service-to-service authentication.

**How it works:**
- The Node.js Server includes a header `X-Service-Key: <shared_key>` when calling the AI Pipeline
- This middleware checks that header against `SERVICE_API_KEY` from config
- If invalid → 403 Forbidden
- If missing → 401 Unauthorized

**Important:** Authentication is **skipped in development mode** (`ENVIRONMENT=development`) so you can test freely with Swagger UI or curl.

**Not yet wired up:** This middleware is defined but not yet applied to routes. Will be added in Phase 4 (Production Hardening) via FastAPI dependencies.

---

## `src/utils/` — Utilities

### `src/utils/__init__.py`
Package init. Empty.

### `src/utils/logger.py`
**What:** Structured logging for the entire service.

**How it works:**
- Creates a Python `logging.Logger` with a consistent format:
  ```
  2026-04-10 01:15:00 | INFO     | kenshi-ai-pipeline | Blog generated successfully
  ```
- Log level is configurable via `LOG_LEVEL` env variable
- Outputs to stdout (so Docker/Cloud Run can capture it)

**How you use it:**
```python
from src.utils.logger import logger

logger.info("Something happened")
logger.warning("Something concerning")
logger.error("Something broke")
```

---

### `src/utils/cost_tracker.py`
**What:** Tracks API usage per provider for cost monitoring.

**Class:** `CostTracker`

**What it records per provider:**
- Total calls, successful calls, failed calls
- Total tokens used
- Last call timestamp

**How you use it:**
```python
from src.utils.cost_tracker import cost_tracker

cost_tracker.record_call("gemini/gemini-2.0-flash", tokens_used=1500, success=True)
summary = cost_tracker.get_usage_summary()
```

**Currently:** In-memory only (resets on restart). In the future, can persist to a database or emit metrics to monitoring.

---

## `tests/` — Test Suite

### `tests/__init__.py`
Package init. Empty.

### `tests/conftest.py`
**What:** Pytest fixtures — shared test setup used across all test files.

**Fixtures provided:**
- `client` — a FastAPI `TestClient` that lets you make fake HTTP requests without starting the server
- `sample_blog_request` — a sample blog generation request dict for testing
- `sample_review_request` — a sample content review request dict for testing

**How fixtures work:** Any test function can accept a fixture as a parameter:
```python
def test_something(client):   # ← "client" fixture injected automatically
    response = client.get("/health")
```

---

### `tests/test_health.py`
**What:** Tests for the root and health endpoints.

**Tests:**
- `test_root_endpoint` — verifies `GET /` returns service info
- `test_health_endpoint` — verifies `GET /health` returns healthy status

**These run without any API keys** — they test the app itself, not AI providers.

---

### `tests/test_provider_chain.py`
**What:** Tests for the provider chain and moderation rules.

**Tests:**
- `test_provider_chain_initialization` — verifies the LLM chain initializes, and Ollama is always registered as fallback
- `test_moderation_rules_loaded` — verifies all 7 rules are defined, critical rules have reject action

---

## How Everything Connects — A Complete Request Flow

Here's what happens when the Node.js Server calls `POST /api/v1/blog/generate`:

```
1.  Node.js Server sends HTTP POST with JSON body:
    { "topic": "WebSockets in Node.js", "category": "Technology" }

2.  FastAPI (main.py) receives the request

3.  Router (api/router.py) matches → /api/v1/blog/generate

4.  Blog route (api/v1/blog.py) validates the body using BlogRequest model
    - If validation fails → 422 Unprocessable Entity (automatic)

5.  Route calls controller → handle_generate_blog(request)

6.  Controller creates BlogGenerator and calls generate(request)

7.  BlogGenerator builds a prompt using blog_full.py template

8.  BlogGenerator calls LLMProviderChain.invoke(prompt)

9.  ProviderChain tries Gemini first:
    - Success → returns (text, "gemini/gemini-2.0-flash")
    - Fails → tries Groq
    - Fails → tries HuggingFace
    - Fails → tries Ollama
    - All fail → RuntimeError

10. BlogGenerator receives the text, calculates read_time,
    packages into BlogDraft

11. Controller logs the result, returns BlogDraft

12. Route returns BlogDraft as JSON response (200 OK)

13. Node.js Server receives the JSON, creates a Post in
    PostgreSQL via Prisma
```
