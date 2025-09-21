export const uploadImage = (req, res) => {
    console.log("Uploading image with data:", req.body);
    console.log("Files received:", req.files);
    return res.status(201).json({ message: "Image uploaded successfully!" });
}