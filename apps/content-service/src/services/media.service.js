import cloudinary from "../utils/cloudinary.js";
import * as repo from "../repositories/media.repository.js";

/* 
optimiztion algorithms---->
q_auto:good => for cover image
q_auto => for thumbnail
q_auto:low => for minor author images
*/

const uploadSingleFile = async (file, folder, serviceRefId, userId) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
            {
                folder,
                transformation: [{ quality: "auto" }]
            }
        );

        const { public_id, secure_url } = uploadResponse;
        const metadata = await repo.createMediaMetaData(public_id, "IMAGE", {
            serviceRefId,
            userId
        });

        if (!metadata) {
            await deleteMedia(public_id);
            throw new Error("Failed to persist media metadata");
        }

        return {
            publicId: public_id,
            secureUrl: secure_url,
            metadata
        };
    } catch (error) {
        console.error("Media Service uploadSingleFile error:", error);
        return null;
    }
};

const uploadImage = async (req, currentUserId) => {
    if (!req.files) {
        return {
            status: 400,
            message: "No files received."
        };
    }

    try {
        const results = {
            thumbnail: null,
            coverImage: null,
            contentImage: null,
            thumb_id: null,
            cover_id: null,
            contentImage_id: null
        };

        const { serviceRefId, userId } = req.body;
        const ownerId = currentUserId || userId;

        if (req.files.thumbnail) {
            const response = await uploadSingleFile(
                req.files.thumbnail[0],
                `kenshi_webspace/${ownerId}/thumbnails`,
                serviceRefId,
                userId
            );
            if (!response) {
                throw new Error("Thumbnail upload failed");
            }
            results.thumbnail = response.secureUrl;
            results.thumb_id = response.publicId;
        }

        if (req.files.coverImage) {
            const response = await uploadSingleFile(
                req.files.coverImage[0],
                `kenshi_webspace/${ownerId}/coverImages`,
                serviceRefId,
                userId
            );
            if (!response) {
                throw new Error("Cover image upload failed");
            }
            results.coverImage = response.secureUrl;
            results.cover_id = response.publicId;
        }

        if (req.files.contentImage) {
            const response = await uploadSingleFile(
                req.files.contentImage[0],
                `kenshi_webspace/${ownerId}/contentImages`,
                serviceRefId,
                userId
            );
            if (!response) {
                throw new Error("Content image upload failed");
            }
            results.contentImage = response.secureUrl;
            results.contentImage_id = response.publicId;
        }

        return {
            status: 201,
            message: "Image uploaded successfully!",
            ...results
        };
    } catch (error) {
        console.error("Media Service uploadImage error:", error);
        return {
            status: 500,
            message: "Error uploading images."
        };
    }
};

const deleteMedia = async (publicId) => {
    console.log("Destroying media with public_id from cloudinary:", publicId);
    try {
        return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Media Service deleteMedia error:", error);
        return null;
    }
};

const deleteMediaEntry = async (req) => {
    const { publicId } = req.body;
    try {
        const deletedMeta = await repo.deleteMediaMetaData(publicId);
        if (!deletedMeta) {
            throw new Error("Failed to delete media metadata");
        }

        const deletedMedia = await deleteMedia(publicId);
        if (!deletedMedia) {
            throw new Error("Failed to delete media from Cloudinary");
        }

        return {
            status: 200,
            message: "Media entry deleted successfully."
        };
    } catch (error) {
        console.error("Media Service deleteMediaEntry error:", error);
        return {
            status: 500,
            message: "Error deleting media entry."
        };
    }
};

const setServiceRef = async (id, type) => {
    return await repo.createServiceRef(id, type);
};

const getServiceRefById = async (id) => {
    return await repo.getServiceRefById(id);
};

const deleteServiceRef = async (id, type) => {
    return await repo.deleteServiceRef(id, type);
};

const getPublicIds = async (serviceRefId) => {
    return await repo.getPublicIds(serviceRefId);
};

const deleteMediaMetaData = async (publicId) => {
    console.log("Deleting media metadata for publicId:", publicId);
    return await repo.deleteMediaMetaData(publicId);
};

const updateMediaMetaDataServiceRef = async (publicId, serviceRefId) => {
    console.log("Updating media metadata service reference for publicId:", publicId);
    return await repo.updateMediaMetaDataServiceRef(publicId, serviceRefId);
};

export {
    uploadImage,
    deleteMediaEntry,
    deleteMedia,
    setServiceRef,
    getServiceRefById,
    deleteServiceRef,
    getPublicIds,
    deleteMediaMetaData,
    updateMediaMetaDataServiceRef
};
