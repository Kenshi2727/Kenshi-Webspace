import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

config();

import logger from './observability/logger.js';
// import { initSentry, attachSentryErrorHandler } from './observability/sentry.js';

import requestIdMiddleware from './middlewares/requestId.middleware.js';
import { validateRequest } from './middlewares/validation.middleware.js';
import { requestLoggingMiddleware } from './middlewares/logging.middleware.js';
import { handle404, errorHandler } from './middlewares/error.middleware.js';

import services from './config/services.js';
import contentRoutes from './routes/content.route.js';
import notificationRoutes from './routes/notification.route.js';

const app = express();

// Initialize Sentry early for error tracking
// initSentry(app);

// ========================
// Security Middleware
// ========================
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID']
}));

// ========================
// Rate Limiting
// ========================
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skip: (req) => req.path === '/health' || req.path === '/status',
    keyGenerator: (req) => req.ip,
    handler: (req, res) => {
        logger.warn('Rate limit exceeded', {
            requestId: req.requestId,
            ip: req.ip,
            path: req.path
        });

        res.status(429).json({
            success: false,
            error: 'Too many requests. Please try again later.',
            requestId: req.requestId,
            retryAfter: req.rateLimit.resetTime
        });
    }
});

app.use(limiter);

// ========================
// Body Parsing Middleware
// ========================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ========================
// Request Processing
// ========================
// Add request ID to every request
app.use(requestIdMiddleware);

// Request logging
app.use(requestLoggingMiddleware);

// Request validation
app.use(validateRequest);

// ========================
// Health & Status Endpoints
// ========================
app.get('/health', (req, res) => {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    logger.debug('Health check', { requestId: req.requestId });

    res.status(200).json({
        success: true,
        message: 'API Gateway is running successfully!',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(uptime)}s`,
        memory: {
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
            external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`
        },
        requestId: req.requestId
    });
});

app.get('/status', (req, res) => {
    res.status(200).json({
        status: 'operational',
        timestamp: new Date().toISOString(),
        services: {
            content: services.content ? 'configured' : 'not configured',
            notification: services.notification ? 'configured' : 'not configured'
        }
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>API Gateway</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    margin: 0;
                    padding: 0;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                .container {
                    text-align: center;
                }
                h1 {
                    font-size: 3em;
                    margin: 0 0 10px 0;
                }
                p {
                    font-size: 1.2em;
                    margin: 5px 0;
                }
                .info {
                    margin-top: 30px;
                    font-size: 0.9em;
                    opacity: 0.9;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>API Gateway</h1>
                <p>Kenshi Webspace Services</p>
                <div class="info">
                    <p>Status: <strong>RUNNING</strong></p>
                    <p>Version: 1.0.0 | Node: ${process.version}</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

// ========================
// Service Routes
// ========================

if (services.content) {
    app.use('/api/content', contentRoutes);
    logger.info('Content service route registered', { target: services.content });
}

if (services.notification) {
    app.use('/api/notification', notificationRoutes);
    logger.info('Notification service route registered', { target: services.notification });
}

// ========================
// Error Handling
// ========================
// Attach Sentry error handler
// attachSentryErrorHandler(app);

// 404 handler
app.use(handle404);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
