import express from 'express';
import notificationRoutes from './notification.route.js';
import contentRoutes from './content.route.js';
import aiRoutes from './ai.route.js';

/**
 * Version 1 API routes.
 */
const router = express.Router();

router.use('/notification', notificationRoutes);
router.use('/content', contentRoutes);
router.use('/ai', aiRoutes);

export default router;
