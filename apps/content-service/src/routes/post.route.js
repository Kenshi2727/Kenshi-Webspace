import express from "express";
import * as controller from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { privilegedRouteAccess } from "../middlewares/rbac.middleware.js";

const router = express.Router();

// post routes
router.post('/new/:authorId', protectRoute, controller.createNewPost);

// get routes
router.get('/category/counts', controller.getCategoryPostCounts);

router.get('/category/check/:categoryName', controller.checkCategoryPosts);

router.get('/:postId', controller.getSinglePost);

router.get('/', controller.getAllPosts, controller.getFeaturedPosts);

router.get('/user-posts/:userId', protectRoute, controller.getUserPosts);

// delete routes
router.delete('/:postId', protectRoute, controller.deletePost);

// update routes
router.patch('/:postId', protectRoute, privilegedRouteAccess(["USER", "OWNER"]), controller.updatePost);

router.put('/likes/:postId', protectRoute, controller.updatePostLikes);

router.put('/views/:postId', controller.countView);

router.put('/bookmarks/:postId', protectRoute, controller.updatePostBookmarks);

export default router;
