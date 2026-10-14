import * as repo from "../repositories/token.repository.js";

const saveFcmToken = async (token, type, userId = null) => {
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
        const tokenType = type === 'private' ? "PRIVATE" : "PUBLIC";
        const savedToken = await repo.saveFcmToken(token, tokenType, userId);

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

const getAllFcmTokens = async (audience = "all") => {
    try {
        if (!["all", "reviewers"].includes(audience)) return [];

        const tokenRows = audience === "reviewers"
            ? await repo.getReviewerFcmTokens()
            : await repo.getAllFcmTokens();
        if (!tokenRows) return [];

        if (audience === "reviewers") return tokenRows;

        console.log(`Retrieved ${audience} FCM tokens:`, tokenRows.length);
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
