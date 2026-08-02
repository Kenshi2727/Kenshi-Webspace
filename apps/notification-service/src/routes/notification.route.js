import express from 'express';
import { multicast } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/multicast', multicast);

export default router;  
