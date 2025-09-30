import express from "express";
import { createNewPost, getAllPosts, getSinglePost, getFeaturedPosts } from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/new/:authorId', protectRoute, createNewPost);

router.get('/:postId', getSinglePost);

router.get('/', getAllPosts, getFeaturedPosts);

export default router;