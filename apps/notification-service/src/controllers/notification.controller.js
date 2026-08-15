import * as service from "../services/notification.service.js";

export const multicast = async (req, res) => {
    console.log("Multicast notification received:", req.body);
    const result = await service.multicast(req.body);
    return res.status(result.status).json(result);
};




