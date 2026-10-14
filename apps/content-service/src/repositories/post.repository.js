import prisma from "@repo/database";

const createPost = async (data) => {
    try {
        return await prisma.post.create({ data });
    } catch (error) {
        console.error("Post Repo createPost error:", error);
        return null;
    }
};

const getPostById = async (id, include = { author: true, PostActions: true }) => {
    try {
        return await prisma.post.findUnique({
            where: { id },
            include
        });
    } catch (error) {
        console.error("Post Repo getPostById error:", error);
        return null;
    }
};

const getUserRole = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });
        return user?.role || null;
    } catch (error) {
        console.error("Post Repo getUserRole error:", error);
        return null;
    }
};

const getAllPosts = async () => {
    try {
        return await prisma.post.findMany({
            where: { status: "published" },
            orderBy: { createdAt: 'desc' },
            include: { PostActions: true }
        });
    } catch (error) {
        console.error("Post Repo getAllPosts error:", error);
        return null;
    }
};

const getReadingMapArticles = async () => {
    try {
        return await prisma.post.findMany({
            where: { status: "published" },
            orderBy: { createdAt: "desc" },
            take: 40,
            select: {
                id: true,
                title: true,
                excerpt: true,
                category: true,
                createdAt: true,
                updatedAt: true,
            }
        });
    } catch (error) {
        console.error("Post Repo getReadingMapArticles error:", error);
        return null;
    }
};

const getFeaturedPosts = async () => {
    try {
        return await prisma.post.findMany({
            where: { featured: true, status: "published" },
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (error) {
        console.error("Post Repo getFeaturedPosts error:", error);
        return null;
    }
};

const countPostsByCategory = async (category) => {
    try {
        return await prisma.post.count({
            where: {
                status: "published",
                category: {
                    equals: category,
                    mode: 'insensitive'
                }
            }
        });
    } catch (error) {
        console.error("Post Repo countPostsByCategory error:", error);
        return null;
    }
};

const getCategoryPostCounts = async () => {
    try {
        return await prisma.post.groupBy({
            by: ['category'],
            where: { status: "published" },
            _count: { _all: true }
        });
    } catch (error) {
        console.error("Post Repo getCategoryPostCounts error:", error);
        return null;
    }
};

const getPendingReviewPosts = async () => {
    try {
        return await prisma.post.findMany({
            where: { status: "draft" },
            orderBy: { createdAt: "asc" },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        profile: { select: { image: true } }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Post Repo getPendingReviewPosts error:", error);
        return null;
    }
};

const updatePostReview = async (postId, data) => {
    try {
        const result = await prisma.post.updateMany({
            where: { id: postId, status: "draft" },
            data
        });
        if (result.count === 0) return null;

        return await prisma.post.findUnique({
            where: { id: postId },
            select: { id: true, status: true, adminRemark: true }
        });
    } catch (error) {
        console.error("Post Repo updatePostReview error:", error);
        return null;
    }
};

const getPostsByAuthor = async (authorId) => {
    try {
        return await prisma.post.findMany({
            where: { authorId },
            select: {
                id: true,
                title: true,
                excerpt: true,
                category: true,
                readTime: true,
                thumbnail: true,
                authorImage: true,
                coverImage: true,
                likes: true,
                views: true,
                bookmarks: true,
                downloads: true,
                updatedAt: true,
                createdAt: true,
                status: true,
                content: true,
                adminRemark: true
            }
        });
    } catch (error) {
        console.error("Post Repo getPostsByAuthor error:", error);
        return null;
    }
};

const getPostReferenceStatus = async (postId) => {
    try {
        return await prisma.post.findUnique({
            where: { id: postId },
            select: { referenceStatus: true }
        });
    } catch (error) {
        console.error("Post Repo getPostReferenceStatus error:", error);
        return null;
    }
};

const deletePostById = async (postId) => {
    try {
        return await prisma.post.delete({
            where: { id: postId }
        });
    } catch (error) {
        console.error("Post Repo deletePostById error:", error);
        return null;
    }
};

const updatePostById = async (postId, data) => {
    try {
        return await prisma.post.update({
            where: { id: postId },
            data
        });
    } catch (error) {
        console.error("Post Repo updatePostById error:", error);
        return null;
    }
};

const findPostAction = async (userId, postId) => {
    try {
        return await prisma.postActions.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        });
    } catch (error) {
        console.error("Post Repo findPostAction error:", error);
        return { error };
    }
};

const updatePostAction = async (userId, postId, data) => {
    try {
        return await prisma.postActions.update({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            },
            data
        });
    } catch (error) {
        console.error("Post Repo updatePostAction error:", error);
        return null;
    }
};

const updatePostActionById = async (actionId, data) => {
    try {
        return await prisma.postActions.update({
            where: { id: actionId },
            data
        });
    } catch (error) {
        console.error("Post Repo updatePostActionById error:", error);
        return null;
    }
};

const createPostAction = async (data) => {
    try {
        return await prisma.postActions.create({ data });
    } catch (error) {
        console.error("Post Repo createPostAction error:", error);
        return null;
    }
};

const incrementPostField = async (postId, field, operation) => {
    const allowedFields = ["likes", "bookmarks", "views"];
    const allowedOps = ["increment", "decrement"];
    if (!allowedFields.includes(field) || !allowedOps.includes(operation)) {
        console.error("Post Repo incrementPostField received invalid arguments", { field, operation });
        return null;
    }

    try {
        return await prisma.post.update({
            where: { id: postId },
            data: {
                [field]: {
                    [operation]: 1
                }
            }
        });
    } catch (error) {
        console.error("Post Repo incrementPostField error:", error);
        return null;
    }
};

export {
    createPost,
    getPostById,
    getUserRole,
    getAllPosts,
    getReadingMapArticles,
    getPendingReviewPosts,
    updatePostReview,
    getFeaturedPosts,
    countPostsByCategory,
    getCategoryPostCounts,
    getPostsByAuthor,
    getPostReferenceStatus,
    deletePostById,
    updatePostById,
    findPostAction,
    updatePostAction,
    updatePostActionById,
    createPostAction,
    incrementPostField
};
