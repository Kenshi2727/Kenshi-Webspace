import express from "express";
import { createNewPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/new/:authorId', createNewPost);

export default router;