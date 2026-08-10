import express from 'express';
import * as controller from '../controllers/token.controller.js';

const router = express.Router();

// Query Params:
// type=public => for public fcm services
// type=private =>for user specific fcm services
router.post('/fcm-token', controller.saveFcmToken);

export default router;  
