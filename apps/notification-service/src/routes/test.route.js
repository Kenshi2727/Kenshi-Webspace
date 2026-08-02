import express from 'express';
import { protectTestRoute } from '../middlewares/test.middleware.js';
import { testNotify } from '../controllers/test.controller.js';

const router = express.Router();

/* TESTING ROUTE ! - DISABLED ON PRODUCTION  */
router.get('/test-notif', protectTestRoute, testNotify);

export default router;  
