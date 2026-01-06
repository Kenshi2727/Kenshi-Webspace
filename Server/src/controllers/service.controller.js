import prisma from "../../../Database/prisma.client.js";
import { messaging } from "../services/firebase.js";

// TODO: IMPLEMENT LOGIC FOR HANDLING TOKEN EXPIRY AND CLEANUP

// FCM(Firbase Cloud Messaging) Service Controllers

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
        res.status(200).json({ message: "FCM token received and stored!" });
    } catch (error) {
        console.error("Error in rendering FCM Token:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const testNotify = (req, res) => {
    console.log("Test notif hit!");

    // These registration tokens come from the client FCM SDKs.
    const registrationTokens = [
        'e9stE0co5WZJpcUL-xYlXB:APA91bESkdWlFbkGX__7ArhwjcvYOw3M1WZGW943nDKRteZ6JYZzWu7b0aQt4PUYA6Dw0Hl0Chd9I-tpzMsTx8CRwKf7X2ASi5TciuM9t5K4CcWI3safdGg'
    ];

    const message = {
        notification: {
            title: 'Testing',
            body: 'This is a test notification',
        },
        data: { score: '850', time: '2:45' },
        tokens: registrationTokens,
    };

    messaging.sendEachForMulticast(message)
        .then((response) => {
            console.log(response.successCount + ' messages were sent successfully');
            console.log("Message:", response);
            if (response.failureCount > 0) {
                const failedTokens = [];
                response.responses.forEach((resp, idx) => {
                    if (!resp.success) {
                        failedTokens.push(registrationTokens[idx]);
                    }
                });
                console.log('List of tokens that caused failures: ' + failedTokens);
            }
        });
    res.status(200).json({ message: "Test notification sent!" });
}



