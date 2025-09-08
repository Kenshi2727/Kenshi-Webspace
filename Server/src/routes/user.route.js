import express from 'express';
import { handleWebhook, deleteUser } from '../controllers/user.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

//NOTE-CLERK WEBHOOKS ALWAYS SEND POST REQUESTS
router.post('/webhook', handleWebhook);
// express.json() used in other routes 
router.delete('/delete', express.json(), protectRoute, deleteUser);

export default router;