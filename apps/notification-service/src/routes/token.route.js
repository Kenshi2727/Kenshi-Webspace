import express from 'express';
import { saveFcmToken } from '../controllers/token.controller.js';

const router = express.Router();

// Query Params:
// type=public => for public fcm services
// type=private =>for user specific fcm services
router.post('/fcm-token', saveFcmToken);

export default router;  
