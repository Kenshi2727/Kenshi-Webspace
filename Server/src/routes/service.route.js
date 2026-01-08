import express from 'express';
import { saveFcmToken, testNotify } from '../controllers/service.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { protectTestRoute } from '../middlewares/test.middleware.js';

const router = express.Router();

// Query Params:
// type=public => for public fcm services
// type=private =>for user specific fcm services
router.post('/fcm-token', protectRoute, saveFcmToken);


/* TESTING ROUTE ! - DISABLED ON PRODUCTION  */
router.get('/test-notif', protectTestRoute, testNotify);

export default router;
