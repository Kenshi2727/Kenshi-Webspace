import express from 'express';
import { uploadImage } from '../controllers/media.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });// memory buffer

router.post('/upload/image', protectRoute, upload.fields([{ name: 'imageUploads', maxCount: 2 }]), uploadImage);

export default router;