import { Router } from 'express';
import { createInsightsController } from '../controllers/insights.controller.js';
import type { InsightsService } from '../services/insights.service.js';

export const createInsightsRoutes = (service: InsightsService) => {
    const router = Router();
    const controller = createInsightsController(service);

    router.post('/insights', controller.createInsights);
    router.post('/chat', controller.answerQuestion);

    return router;
};
