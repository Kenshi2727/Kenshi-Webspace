export const createNewPost = (req, res) => {
    console.log("Request body:", req.body);
    console.log("Creating a new post for author ID:", req.params.authorId);
    return res.status(201).json({ message: "New post created!" });
}