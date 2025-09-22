import prisma from "../../../Database/prisma.client.js";

// todo: make only allowed fields in database to be updated
export const createNewPost = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Creating a new post for author ID:", req.params.authorId);

    try {
        await prisma.post.create({
            data: {
                ...req.body,
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