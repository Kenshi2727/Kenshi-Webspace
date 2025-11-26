import express from "express";
import { createNewPost, getAllPosts, getSinglePost, getFeaturedPosts, deletePost, updatePost, updatePostLikes } from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/new/:authorId', protectRoute, createNewPost);

router.get('/:postId', getSinglePost);

router.get('/', getAllPosts, getFeaturedPosts);

router.delete('/:postId', protectRoute, deletePost);

router.patch('/:postId', protectRoute, updatePost);

router.put('/likes/:postId', protectRoute, updatePostLikes);

export default router;