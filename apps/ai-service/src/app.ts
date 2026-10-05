import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { env } from './config/env.js';
import { gatewayAuth } from './middlewares/gateway-auth.middleware.js';
import { createInsightsRoutes } from './routes/insights.routes.js';
import { InsightsService } from './services/insights.service.js';

const app = express();
env.googleApiKey();
const insightsService = new InsightsService();
const insightsRoutes = createInsightsRoutes(insightsService);

app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', env.corsOrigin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-gateway-secret');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (_req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }
    next();
});
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
    res.json({ success: true, service: 'ai-service', status: 'healthy' });
});

app.use('/api/v1', gatewayAuth, insightsRoutes);

app.use((_req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

export default app;
