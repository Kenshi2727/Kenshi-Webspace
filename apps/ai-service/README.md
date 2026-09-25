# AI Service

TypeScript microservice for article insights and article-aware questions.

## Architecture

- `routes/` maps HTTP endpoints.
- `controllers/` validates requests and formats responses.
- `services/` owns insight and chat use cases.
- `repositories/` owns calls to the configured AI provider.
- `config/` owns environment configuration.

## Endpoints

The service is exposed through the gateway under `/api/v1/ai`:

- `POST /api/v1/ai/insights`
- `POST /api/v1/ai/chat`

Both requests send an `article` object with `id`, `title`, and `content`. Chat requests also send `question`.

## Environment

Copy `.env.example` to `.env` and set `GEMINI_API_KEY`, `GATEWAY_SECRET`, and `AI_SERVICE_URL` in the gateway environment. The provider repository calls Gemini's native `generateContent` REST endpoint. `GEMINI_MODEL` and `GEMINI_API_URL` can be changed for another Gemini model or API version.

## Commands

```text
npm run build
npm start
```
