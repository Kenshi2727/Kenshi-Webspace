import prisma from "@kenshi/database/prisma.client.js";
import { messaging } from "../services/firebase.js";

// TODO: IMPLEMENT LOGIC FOR HANDLING TOKEN EXPIRY AND CLEANUP

// FCM(Firebase Cloud Messaging) Service Controllers

export const saveFcmToken = async (req, res) => {
    try {
        //controller to save fcm token to database
        console.log("FCM Token received:", req.body);
        const token = req.body.token;
        const type = req.headers['fcm-service-type'];

        if (!token || token === undefined || token === null || token === "")
            throw new Error("FCM token is corrupted or missing");
        if (!type || (type !== 'public' && type !== 'private'))
            throw new Error("FCM service type is corrupted or missing");

        if (type === 'public') {
            // saving token to database for public fcm services
            const response = await prisma.fcmToken.create({
                data: {
                    token,
                    type: prisma.TokenType.PUBLIC,
                }
            });
            console.log("FCM token type public created!", response);

            if (type === 'private') {
                // todo: implement logic for private fcm services
            }
        }
        return res.status(200).json({ message: "FCM token received and stored!" });
    } catch (error) {
        console.error("Error in rendering FCM Token:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const renderALLFcmTokens = async () => {
    try {
        const tokenObj = await prisma.fcmToken.findMany({
            select: {
                token: true
            }
        });
        const tokens = tokenObj.map((t) => t.token);
        console.log("Rendered tokens:", tokens);
        return tokens;
    } catch (error) {
        console.error("Error fetching FCM tokens:", error);
    }
}