import { Router } from 'express';
import { answerQuestion, createInsights } from '../controllers/insights.controller.js';

const router = Router();

router.post('/insights', createInsights);
router.post('/chat', answerQuestion);

export default router;
