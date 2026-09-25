# AI Service

TypeScript microservice for article insights and article-aware questions.

## Architecture

- `routes/` maps HTTP endpoints.
- `controllers/` validates requests and formats responses.
- `services/` owns insight and chat use cases.
- `tools/` owns the article context tool supplied to the LangChain agent.
- `config/` owns environment configuration.

## Endpoints

The service is exposed through the gateway under `/api/v1/ai`:

- `POST /api/v1/ai/insights`
- `POST /api/v1/ai/chat`

Both requests send an `article` object with `id`, `title`, and `content`. Chat requests also send `question`.

## Environment

Copy `.env.example` to `.env` and set `GOOGLE_API_KEY`, `GATEWAY_SECRET`, and `AI_SERVICE_URL` in the gateway environment. `AI_MODEL` defaults to `google-genai:gemini-3.5-flash-lite`; change that LangChain model identifier to switch providers without changing the service use cases.

## Commands

```text
npm run build
npm start
```
