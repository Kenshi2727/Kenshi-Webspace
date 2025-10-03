import prisma from "../../../Database/prisma.client.js";

// Note-
/* 
if req.body passed directly-
If someone sends a field that does exist in your schema but 
you don’t actually want users to control (e.g., role, isAdmin, passwordHash), Prisma will happily write it.
This is called a Mass Assignment vulnerability.
 */

export const createNewPost = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Creating a new post for author ID:", req.params.authorId);
    const { title, excerpt, category, thumbnail, coverImage, content } = req.body;

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                excerpt,
                category,
                thumbnail,
                coverImage,
                content,
                readTime: Number(req.body.readTime),
                authorId: req.params.authorId
            }
        });

        console.log("Post created successfully for author ID:", req.params.authorId);

        return res.status(201).json({
            message: "New post created!",
            postId: newPost.id
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Failed to create post" });
    }
}

export const getSinglePost = async (req, res) => {
    const { postId } = req.params;
    console.log("Fetching post with ID:", postId);

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true,
            },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found !" });
        }

        console.log("Post fetched successfully:", post);
        return res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).json({ error: "Failed to fetch post" });
    }
}

export const getAllPosts = async (req, res, next) => {
    console.log("Fetching all posts");
    try {
        if (req.query.isFeatured === 'true') {
            console.log("Request for featured posts");
            return next();
        }

        if (req.query.populate === '*') {
            const posts = await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });

            console.log(`Fetched ${posts.length} posts`);
            return res.status(200).json({
                params: req.query,
                posts
            });

            // Simulating network delay for testing loading states
            // setTimeout(() => {
            //     return res.status(200).json({
            //         params: req.query,
            //         posts
            //     });
            // }, 2000);
        }
        else {
            return res.status(400).json({ error: "Invalid query parameter" });
        }
    } catch (error) {
        console.error("Error fetching all posts:", error);
        return res.status(500).json({ error: "Failed to fetch all posts" });
    }
}

export const getFeaturedPosts = async (req, res) => {
    console.log("Fetching featured posts");
    try {
        const featuredPosts = await prisma.post.findMany({
            where: {
                featured: true
            }
        });
        return res.status(200).json({ message: "Featured posts fetched successfully", featuredPosts });
    } catch (error) {
        console.error("Error fetching featured posts:", error);
        return res.status(500).json({ error: "Failed to fetch featured posts" });
    }
}

export const deletePost = async (req, res) => {
    const { postId } = req.params;
    console.log("Deleting post with ID:", postId);
    res.status(200).json({ message: "Post deleted successfully" });
}