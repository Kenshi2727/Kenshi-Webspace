import cloudinary from "../utils/cloudinary.js";
import prisma from "../../../Database/prisma.client.js";

// helper functions
const setMediaMetaData = async (publicId, mediaType, options) => {
    try {
        if (!prisma.MediaType[mediaType]) throw new Error("Invalid media type");

        const mediaMetaData = await prisma.mediaMetaData.create({
            data: {
                publicId,
                mediaType,
                ...options
            }
        });
        return mediaMetaData;//success
    } catch (error) {
        console.error("Error creating media metadata:", error);
        return null;// failure
    }
}

// Export controller functions

/* 
optimiztion algorithms---->
q_auto:good => for cover image
q_auto => for thumbnail
q_auto:low => for minor author images
*/
export const uploadImage = async (req, res) => {
    console.log("Files received:", req.files);

    if (!req.files) return res.status(400).json({ message: "No files received." });

    try {
        let thumbnail = '';
        let thumb_id = null;
        let coverImage = '';
        let cover_id = null;

        if (req.files.thumbnail) {
            const uploadResponse = await cloudinary.uploader.upload(
                `data:${req.files.thumbnail[0].mimetype};base64,${req.files.thumbnail[0].buffer.toString('base64')}`,
                {
                    folder: `kenshi_webspace/${res.locals.userId}/thumbnails`,
                    transformation: [
                        {
                            quality: "auto"
                        }
                    ]
                }
            );
            thumbnail = uploadResponse.secure_url;
            // console.log(uploadResponse);
            const { public_id } = uploadResponse;
            const { serviceRefId, userId } = req.body;//options
            const thumbnailMetaData = await setMediaMetaData(public_id, prisma.MediaType.IMAGE, { serviceRefId, userId });
            console.log("Thumbnail metadata saved:", thumbnailMetaData);
            thumb_id = public_id;

            if (thumbnailMetaData === null) {
                // delete media
                await deleteMedia(public_id);
                throw new Error("Thumbnail meta data is null")
            }
        }
        if (req.files.coverImage) {
            const uploadResponse = await cloudinary.uploader.upload(
                `data:${req.files.coverImage[0].mimetype};base64,${req.files.coverImage[0].buffer.toString('base64')}`,
                {
                    folder: `kenshi_webspace/${res.locals.userId}/coverImages`,
                    transformation: [
                        {
                            quality: "auto:good"
                        }
                    ]
                }
            );
            coverImage = uploadResponse.secure_url;
            const { public_id } = uploadResponse;
            const { serviceRefId, userId } = req.body;//options
            const coverImageMetaData = await setMediaMetaData(public_id, prisma.MediaType.IMAGE, { serviceRefId, userId });
            console.log("Cover image metadata saved:", coverImageMetaData);
            cover_id = public_id;

            if (coverImageMetaData === null) {
                // delete media
                await deleteMedia(public_id);
                throw new Error("CoverImage meta data is null")
            }
        }

        console.log("Upload response:", { thumbnail, coverImage });

        return res.status(201).json({
            message: "Image uploaded successfully!",
            thumbnail,
            coverImage,
            thumb_id,
            cover_id
        });
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return res.status(500).json({ message: "Error uploading images." });
    }
}

export const deleteMedia = async (req, res) => {
    // to be implemented later
}

export const setServiceRef = async (id, type) => {
    try {
        if (!prisma.ServiceType[type]) throw new Error("Invalid service type");

        const ServiceRef = await prisma.serviceRef.create({
            data: {
                id,
                type,
            }
        });
        return ServiceRef;//success
    } catch (error) {
        console.error("Error creating service reference:", error);
        return null;// failure
    }
}

export const deleteMediaMetaData = async (publicId) => {
    // to be implemented later
    console.log("Delete media metadata called");
}

export const deleteServiceRef = async (id) => {
    // to be implemented later
    console.log("Delete service reference called");
}