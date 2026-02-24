import express from "express";
import {
    createNewPost,
    getAllPosts,
    getSinglePost,
    getFeaturedPosts,
    getUserPosts,
    deletePost,
    updatePost,
    updatePostLikes,
    countView,
    updatePostBookmarks
} from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { privilegedRouteAccess } from "../middlewares/rbac.middleware.js";

const router = express.Router();

// post routes
router.post('/new/:authorId', protectRoute, createNewPost);

// get routes
router.get('/:postId', getSinglePost);

router.get('/', getAllPosts, getFeaturedPosts);

router.get('/user-posts/:userId', protectRoute, getUserPosts);

// delete routes
router.delete('/:postId', protectRoute, deletePost);

// update routes
router.patch('/:postId', protectRoute, privilegedRouteAccess(["USER"]), updatePost);

router.put('/likes/:postId', protectRoute, updatePostLikes);

router.put('/views/:postId', countView);

router.put('/bookmarks/:postId', protectRoute, updatePostBookmarks);

export default router;