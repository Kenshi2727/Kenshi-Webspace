# API Gateway 🚀

A production-grade API Gateway for the Kenshi Webspace monorepo. Routes requests to backend services with comprehensive logging, tracing, validation, and timeout management.

## Features

**Production Ready**
- Request ID tracking across all services
- Structured JSON logging with Sentry integration
- Request/response validation
- Connection, request, and proxy timeouts
- Rate limiting and security headers
- Graceful shutdown and error handling
- Health checks and monitoring

## Quick Start

### Installation

```bash
cd apps/gateway
npm install
```

### Configuration

Copy the example environment file and configure your services:

```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=7000
NODE_ENV=development
CONTENT_SERVICE_URL=http://localhost:3001
NOTIFICATION_SERVICE_URL=http://localhost:3002
```

### Running

**Development:**
```bash
npm run dev
```

**Production:**
```bash
NODE_ENV=production node src/index.js
```

## Testing

```bash
# Health check
curl http://localhost:7000/health

# Status
curl http://localhost:7000/status

# Proxy to content service
curl -X POST http://localhost:7000/api/content/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'
```

## API Endpoints

### Public Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Gateway info page |
| GET | `/health` | Health check with metrics |
| GET | `/status` | Service status |

### Service Proxies

| Path | Service | Description |
|------|---------|-------------|
| `/api/content/*` | content-service | Content management |
| `/api/notification/*` | notification-service | Notifications |

## Request Tracking

Every request includes a unique ID for end-to-end tracing:

```bash
curl -X GET http://localhost:7000/health \
  -H "X-Request-ID: 550e8400-e29b-41d4-a716-446655440000"
```

Response includes:
```json
{
  "success": true,
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## Timeout Configuration

| Timeout | Duration | Purpose |
|---------|----------|---------|
| Connection | 3 seconds | Establish connection to backend |
| Request | 15 seconds | Total client request processing |
| Proxy | 10 seconds | Backend service response |

Configured in `src/constants/timeout.constants.js`

## Validation

The gateway validates:
- ✅ Content-Type header (required for POST/PUT/PATCH)
- ✅ Valid content types (JSON, form-data, multipart)
- ✅ Request body size (max 10MB)
- ✅ Path and query parameters

## Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "error": "Error description",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 408 | Request Timeout |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |
| 502 | Bad Gateway (service error) |
| 503 | Service Unavailable |
| 504 | Gateway Timeout |

## Rate Limiting

- **Limit**: 100 requests per IP
- **Window**: 15 minutes
- **Response**: 429 Too Many Requests

Configure in `.env`:
```env
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

## Logging

Logs are structured JSON with full request context:

```json
{
  "timestamp": "2024-08-17T10:00:00.000Z",
  "service": "api-gateway",
  "level": "INFO",
  "message": "POST /api/content/posts 201",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "duration": "245ms"
}
```

### Log Levels

- **DEBUG**: Detailed request/response info
- **INFO**: Normal operations
- **WARN**: Rate limits, timeouts, service issues
- **ERROR**: Exceptions and errors

Set in `.env`:
```env
LOG_LEVEL=info
```

## Sentry Integration (Optional)

For error tracking and distributed tracing:

```env
SENTRY_DSN=https://your-key@sentry.io/your-project-id
SENTRY_TRACES_SAMPLE_RATE=0.1
```

## Architecture

```
Client
  ↓
[Security Headers] → Helmet
  ↓
[Rate Limiting] → Express Rate Limit
  ↓
[Request Processing] → Logging, ID, Validation
  ↓
[Timeouts] → Connection, Request, Proxy
  ↓
[Service Proxy] → Content, Notification, etc.
  ↓
[Error Handler] → Consistent error responses
  ↓
Response
```

## Middleware Stack

1. Sentry request handler
2. Helmet security headers
3. CORS
4. Rate limiting
5. Body parsing
6. Request ID
7. Logging
8. Timeouts
9. Validation
10. Proxy/Routes
11. Error handling

## Environment Variables

```env
# Server
PORT=7000
NODE_ENV=development

# Logging
LOG_LEVEL=info

# CORS
CORS_ORIGIN=*

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Services
CONTENT_SERVICE_URL=http://localhost:3001
NOTIFICATION_SERVICE_URL=http://localhost:3002

# Sentry (optional)
SENTRY_DSN=
SENTRY_TRACES_SAMPLE_RATE=0.1
```

See `.env.example` for full configuration options.

## File Structure

```
src/
├── app.js                      # Express app setup
├── index.js                    # Entry point
├── config/services.js          # Service URLs
├── constants/                  # Constants
│   ├── header.constants.js
│   ├── http.constants.js
│   └── timeout.constants.js
├── middlewares/                # Middleware functions
│   ├── requestId.middleware.js
│   ├── validation.middleware.js
│   ├── error.middleware.js
│   ├── timeout.middleware.js
│   └── logging.middleware.js
├── observability/              # Logging & tracing
│   ├── logger.js
│   └── sentry.js
├── proxy/                      # Proxy middleware
│   └── proxy.middleware.js
└── routes/                     # Route handlers
```

## Development

### Running in Development Mode

```bash
npm run dev
```

Uses `nodemon` for auto-reload.

### Debugging

Enable debug logging:
```env
LOG_LEVEL=debug
```

### Testing Timeouts

```bash
# Test request timeout (15 seconds)
curl --max-time 20 http://localhost:7000/api/content/slow-endpoint

# Test rate limiting
for i in {1..101}; do curl http://localhost:7000/health; done
```

## Production Deployment

### Docker

```bash
docker build -t gateway:latest .
docker run -p 7000:7000 \
  -e NODE_ENV=production \
  -e CONTENT_SERVICE_URL=http://content:3001 \
  gateway:latest
```

### Kubernetes

```bash
kubectl apply -f k8s/gateway.yaml
```

### Environment Variables for Production

```env
NODE_ENV=production
LOG_LEVEL=warn
CORS_ORIGIN=https://example.com
SENTRY_DSN=https://your-key@sentry.io/your-project-id
SENTRY_TRACES_SAMPLE_RATE=0.1
```

## Monitoring

### Health Checks

```bash
curl http://localhost:7000/health
```

Returns:
- Uptime
- Memory usage
- Request ID
- Timestamp

### Status Endpoint

```bash
curl http://localhost:7000/status
```

Returns:
- Service operational status
- Configured services
- Timestamp

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 7000
lsof -i :7000
# Kill process
kill -9 <PID>
```

### Service Connection Refused
- Verify service is running
- Check `CONTENT_SERVICE_URL` and `NOTIFICATION_SERVICE_URL` in `.env`
- Check firewall rules

### Rate Limit Errors (429)
- Wait for 15-minute window to reset
- Check X-RateLimit headers in response

### Timeout Errors (408, 503, 504)
- Check if backend services are responding
- Check network connectivity
- Review service logs

## Support

For issues and questions:
1. Check the [Production Guide](./PRODUCTION_GUIDE.md) for detailed documentation
2. Review gateway logs: `cat logs/gateway.log`
3. Check Sentry dashboard for errors
4. Review backend service logs

## License

ISC

## Authors

- **Abhishek Mathur** - Kenshi Webspace
- **Repository**: https://github.com/Kenshi2727/Kenshi-Webspace
