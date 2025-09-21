import cloudinary from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
    console.log("Files received:", req.files);

    if (!req.files) return res.status(400).json({ message: "No files received." });

    try {
        let thumbnail = '';
        let coverImage = '';
        if (req.files.thumbnail) {
            const uploadResponse = await cloudinary.uploader.upload(
                `data:${req.files.thumbnail[0].mimetype};base64,${req.files.thumbnail[0].buffer.toString('base64')}`,
                { folder: "kenshi_webspace" }
            );
            thumbnail = uploadResponse.secure_url;
        }
        if (req.files.coverImage) {
            const uploadResponse = await cloudinary.uploader.upload(
                `data:${req.files.coverImage[0].mimetype};base64,${req.files.coverImage[0].buffer.toString('base64')}`,
                { folder: "kenshi_webspace" }
            );
            coverImage = uploadResponse.secure_url;
        }

        console.log("Upload response:", { thumbnail, coverImage });

        return res.status(201).json({
            message: "Image uploaded successfully!",
            data: {
                thumbnail,
                coverImage
            }
        });
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return res.status(500).json({ message: "Error uploading images." });
    }
}