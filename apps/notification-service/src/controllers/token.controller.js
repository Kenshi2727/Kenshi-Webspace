import * as service from "../services/token.service.js";

// TODO: IMPLEMENT LOGIC FOR HANDLING TOKEN EXPIRY AND CLEANUP

// FCM(Firebase Cloud Messaging) Service Controllers

export const saveFcmToken = async (req, res) => {
    console.log("FCM Token received:", req.body);
    const token = req.body.token;
    const type = req.headers["fcm-service-type"];

    const result = await service.saveFcmToken(token, type);
    return res.status(result.status).json(result);
};

export const renderALLFcmTokens = async () => {
    return await service.getAllFcmTokens();
};
