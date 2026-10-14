import prisma from "@repo/database";

const saveFcmToken = async (token, type, userId = null) => {
    try {
        if (userId) {
            const existingUserToken = await prisma.fcmToken.findUnique({ where: { userId } });
            if (existingUserToken) {
                return await prisma.fcmToken.update({
                    where: { userId },
                    data: { token, type, userId }
                });
            }
        }

        return await prisma.fcmToken.upsert({
            where: { token },
            create: { token, type, userId },
            update: { type, userId }
        });
    } catch (error) {
        console.error("Notification Repo saveFcmToken error:", error);
        return null;
    }
};

const getAllFcmTokens = async () => {
    try {
        return await prisma.fcmToken.findMany({
            select: { token: true }
        });
    } catch (error) {
        console.error("Notification Repo getAllFcmTokens error:", error);
        return null;
    }
};

const getReviewerFcmTokens = async () => {
    try {
        const tokenRows = await prisma.fcmToken.findMany({
            where: {
                type: "PRIVATE",
                user: { role: { in: ["ADMIN", "OWNER"] } }
            },
            select: { token: true }
        });
        return tokenRows.map((row) => row.token);
    } catch (error) {
        console.error("Notification Repo getReviewerFcmTokens error:", error);
        return null;
    }
};

export {
    saveFcmToken,
    getAllFcmTokens,
    getReviewerFcmTokens
};
