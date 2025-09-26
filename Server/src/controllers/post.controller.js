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
        await prisma.post.create({
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
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Failed to create post" });
    }
    return res.status(201).json({ message: "New post created!" });
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