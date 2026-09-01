import express from 'express';
import { protectTestRoute } from '../middlewares/test.middleware.js';
import * as controller from '../controllers/test.controller.js';

const router = express.Router();

/* TESTING ROUTE ! - DISABLED ON PRODUCTION  */
router.get('/test-notif', protectTestRoute, controller.testNotify);

export default router;  
