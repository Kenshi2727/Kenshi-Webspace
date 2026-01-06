import express from 'express';
import { saveFcmToken, testNotify } from '../controllers/service.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Query Params:
// type=public => for public fcm services
// type=private =>for user specific fcm services
router.post('/fcm-token', protectRoute, saveFcmToken);

router.get('/test-notif', testNotify);

export default router;
