import * as service from "../services/user.service.js";

const createNewPost = async (req, res) => {
    const { status, message, postId, error } = await service.createNewPost(req, res);
    if (status === "201") {
        return res.status(201).json({
            message,
            postId
        });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in createNewPost controller!" });
}

const getSinglePost = async (req, res) => {
    const { status, message, post, error } = await service.getSinglePost(req, res);
    if (status === "200") {
        return res.status(200).json({
            message,
            post
        });
    }
    else if (status === "404") {
        return res.status(404).json({ error });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in getSinglePost controller!" });
}

const getAllPosts = async (req, res, next) => {
    if (req.query.isFeatured === 'true') {
        console.log("Request for featured posts");
        return next();
    }

    if (req.query.populate === '*') {
        const { status, message, posts, params, error } = await service.getAllPosts(req, res);
        if (status === "200") {
            return res.status(200).json({
                message,
                params,
                posts
            });
        }
        else if (status === "500") {
            return res.status(500).json({ error });
        }
        return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in getAllPosts controller!" });
    }
    else {
        return res.status(400).json({ error: "Invalid query parameter" });
    }
}

const getFeaturedPosts = async (req, res) => {
    const { status, message, featuredPosts, error } = await service.getFeaturedPosts(req, res);
    if (status === "200") {
        return res.status(200).json({
            message,
            featuredPosts
        });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in getFeaturedPosts controller!" });
}

const checkCategoryPosts = async (req, res) => {
    const { categoryName } = req.params;
    const decodedCategory = decodeURIComponent(categoryName || "").trim();
    console.log("Checking posts for category:", decodedCategory);

    if (!decodedCategory) {
        return res.status(400).json({ error: "Category name is required" });
    }

    const { status, message, category, exists, count, error } = await service.checkCategoryPosts(req, res, next, decodedCategory);

    if (status === "200") {
        return res.status(200).json({
            message,
            category,
            exists,
            count
        });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in checkCategoryPosts controller!" });
}

const getCategoryPostCounts = async (req, res) => {
    const { status, message, counts, error } = await service.getCategoryPostCounts(req, res);
    if (status === "200") {
        return res.status(200).json({
            message,
            counts
        });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in getCategoryPostCounts controller!" });
}

const getUserPosts = async (req, res) => {
    const { status, message, posts, error } = await service.getUserPosts(req, res);
    if (status === "200") {
        return res.status(200).json({
            message,
            posts
        });
    }
    else if (status === "404") {
        return res.status(404).json({ error });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in getUserPosts controller!" });
}

const deletePost = async (req, res) => {
    const { status, message, error } = await service.deletePost(req, res);
    if (status === "200") {
        return res.status(200).json({
            message
        });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in deletePost controller!" });
}

const updatePost = async (req, res) => {
    const { status, message, error } = await service.updatePost(req, res);
    if (status === "200") {
        return res.status(200).json({
            message
        });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in updatePost controller!" });
}

const updatePostLikes = async (req, res) => {
    const { status, message, error } = await service.updatePostLikes(req, res);
    if (status === "200") {
        return res.status(200).json({
            message
        });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in updatePostLikes controller!" });
}

const countView = async (req, res) => {
    const { status, message, viewCount, error } = await service.countView(req, res);
    if (status === "200") {
        return res.status(200).json({
            message,
            viewCount
        });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in countView controller!" });
}

const updatePostBookmarks = async (req, res) => {
    const { status, message, error } = await service.updatePostBookmarks(req, res);
    if (status === "200") {
        return res.status(200).json({
            message
        });
    }
    else if (status === "500") {
        return res.status(500).json({ error });
    }
    return res.status(500).json({ error: "HIGH IMPACT: Unexpected error occurred in updatePostBookmarks controller!" });
}

export {
    createNewPost,
    getSinglePost,
    getAllPosts,
    getFeaturedPosts,
    checkCategoryPosts,
    getCategoryPostCounts,
    getUserPosts,
    deletePost,
    updatePost,
    updatePostLikes,
    countView,
    updatePostBookmarks
}
