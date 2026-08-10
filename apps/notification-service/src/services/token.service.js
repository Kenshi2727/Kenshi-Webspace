import prisma from "@kenshi/database/prisma.client.js";
import * as repo from "../repositories/token.repository.js";

const saveFcmToken = async (token, type) => {
    if (!token) {
        console.error("Token Service saveFcmToken error: FCM token is required");
        return {
            status: 400,
            message: "FCM token is required"
        };
    }

    if (!type || (type !== 'public' && type !== 'private')) {
        console.error("Token Service saveFcmToken error: Invalid FCM service type");
        return {
            status: 400,
            message: "Invalid FCM service type"
        };
    }

    try {
        const tokenType = type === 'private' ? prisma.TokenType.PRIVATE : prisma.TokenType.PUBLIC;
        const savedToken = await repo.saveFcmToken(token, tokenType);

        if (!savedToken) {
            console.error("Token Service saveFcmToken error: Failed to save FCM token");
            return {
                status: 500,
                message: "Failed to save FCM token"
            };
        }

        return {
            status: 200,
            message: "FCM token received and stored!",
            data: savedToken
        };
    } catch (error) {
        console.error("Token Service saveFcmToken error:", error);
        return {
            status: 500,
            message: "Internal server error"
        };
    }
};

const getAllFcmTokens = async () => {
    try {
        const tokenRows = await repo.getAllFcmTokens();
        if (!tokenRows) return [];

        console.log("Retrieved FCM tokens:", tokenRows);
        return tokenRows.map((row) => row.token);
    } catch (error) {
        console.error("Token Service getAllFcmTokens error:", error);
        return [];
    }
};

export {
    saveFcmToken,
    getAllFcmTokens
};
