import * as service from "../services/media.service.js";

export const uploadImage = async (req, res) => {
    const result = await service.uploadImage(req, res.locals?.userId);
    return res.status(result.status).json(result);
};

export const deleteMediaEntry = async (req, res) => {
    const result = await service.deleteMediaEntry(req);
    return res.status(result.status).json({ message: result.message });
};
