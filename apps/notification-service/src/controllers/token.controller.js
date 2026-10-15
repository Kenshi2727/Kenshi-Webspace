import * as service from "../services/token.service.js";
import { getAuth } from "@clerk/express";

// TODO: IMPLEMENT LOGIC FOR HANDLING TOKEN EXPIRY AND CLEANUP

// FCM(Firebase Cloud Messaging) Service Controllers

export const saveFcmToken = async (req, res) => {
    console.log("FCM Token received:", req.body);
    const token = req.body.token;
    const type = req.headers["fcm-service-type"];
    const auth = getAuth(req);

    if (type === "private" && !auth?.userId) {
        return res.status(401).json({ message: "Authentication is required for a private notification token" });
    }

    const result = await service.saveFcmToken(token, type, type === "private" ? auth.userId : null);
    return res.status(result.status).json(result);
};

export const renderALLFcmTokens = async () => {
    return await service.getAllFcmTokens();
};
