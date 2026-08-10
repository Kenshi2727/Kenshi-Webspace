import prisma from "@kenshi/database/prisma.client.js";

const createMediaMetaData = async (publicId, mediaType, options = {}) => {
    try {
        if (!prisma.MediaType[mediaType]) {
            throw new Error("Invalid media type");
        }

        return await prisma.mediaMetaData.create({
            data: {
                publicId,
                mediaType,
                ...options
            }
        });
    } catch (error) {
        console.error("Media Repo createMediaMetaData error:", error);
        return null;
    }
};

const deleteMediaMetaData = async (publicId) => {
    try {
        return await prisma.mediaMetaData.delete({
            where: { publicId }
        });
    } catch (error) {
        console.error("Media Repo deleteMediaMetaData error:", error);
        return null;
    }
};

const createServiceRef = async (id, type) => {
    try {
        if (!prisma.ServiceType[type]) {
            throw new Error("Invalid service type");
        }

        return await prisma.serviceRef.upsert({
            where: { id },
            create: {
                id,
                type,
                updatedAt: new Date()
            },
            update: {
                type,
                updatedAt: new Date()
            }
        });
    } catch (error) {
        console.error("Media Repo createServiceRef error:", error);
        return null;
    }
};

const getServiceRefById = async (id) => {
    try {
        return await prisma.serviceRef.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error("Media Repo getServiceRefById error:", error);
        return error;
    }
};

const deleteServiceRef = async (id, type) => {
    try {
        const serviceRef = await prisma.serviceRef.findUnique({
            where: { id }
        });

        if (!serviceRef || serviceRef.type !== type) {
            console.error("Media Repo deleteServiceRef failed: service reference mismatch or missing", { id, type });
            return null;
        }

        return await prisma.serviceRef.delete({
            where: { id }
        });
    } catch (error) {
        console.error("Media Repo deleteServiceRef error:", error);
        return null;
    }
};

const getPublicIds = async (serviceRefId) => {
    try {
        return await prisma.mediaMetaData.findMany({
            where: { serviceRefId },
            select: { publicId: true }
        });
    } catch (error) {
        console.error("Media Repo getPublicIds error:", error);
        return null;
    }
};

const updateMediaMetaDataServiceRef = async (publicId, serviceRefId) => {
    try {
        return await prisma.mediaMetaData.update({
            where: { publicId },
            data: { serviceRefId }
        });
    } catch (error) {
        console.error("Media Repo updateMediaMetaDataServiceRef error:", error);
        return null;
    }
};

export {
    createMediaMetaData,
    deleteMediaMetaData,
    createServiceRef,
    getServiceRefById,
    deleteServiceRef,
    getPublicIds,
    updateMediaMetaDataServiceRef
};
