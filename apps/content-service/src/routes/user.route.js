import express from 'express';
import * as controller from '../controllers/user.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

//NOTE-CLERK WEBHOOKS ALWAYS SEND POST REQUESTS
router.post('/webhook', controller.handleWebhook);

// express.json() used in other routes 
router.delete('/delete', express.json(), protectRoute, controller.deleteUser);

router.get('/:userId', protectRoute, controller.getUser);

export default router;