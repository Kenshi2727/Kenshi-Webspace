import express from 'express';
import * as controller from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/multicast', controller.multicast);

export default router;  
