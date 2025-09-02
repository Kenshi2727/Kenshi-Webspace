import express from 'express';
import { createUser, deleteUser } from '../controllers/user.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', createUser);
// express.json() used in other routes 
router.delete('/delete', express.json(), protectRoute, deleteUser);

export default router;