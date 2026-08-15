import prisma from "@repo/database";

const saveFcmToken = async (token, type) => {
    try {
        return await prisma.fcmToken.upsert({
            where: { token },
            create: { token, type },
            update: { type }
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

export {
    saveFcmToken,
    getAllFcmTokens
};
