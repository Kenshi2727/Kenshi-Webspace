import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import logger from './logger/index.js';
// import { initSentry, attachSentryErrorHandler } from './observability/sentry.js';
import requestIdMiddleware from './middlewares/requestId.middleware.js';
// import { validateRequest } from './middlewares/validation.middleware.js';
import services from './config/services.js';
import contentRoutes from './routes/content.route.js';
import notificationRoutes from './routes/notification.route.js';
import { HTTP_STATUS } from '../src/constants/http.constants.js';
import { HEADERS } from './constants/header.constants.js';

const app = express();

// Initialize Sentry early for error tracking
// initSentry(app);

app.use(helmet());
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: Object.values(HEADERS),
        credentials: true,
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. 
}
));
app.use(requestIdMiddleware);
// Request validation
// app.use(validateRequest);

app.get('/health', (req, res) => {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    logger.debug('Health check', { requestId: req.requestId });

    res.status(HTTP_STATUS.SUCCESS).json({
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
    res.status(HTTP_STATUS.SUCCESS).json({
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

// Service Routes
app.use('/notification', notificationRoutes);
app.use('/content', contentRoutes);

export default app;