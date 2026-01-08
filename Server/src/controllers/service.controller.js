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
        return res.status(200).json({ message: "FCM token received and stored!" });
    } catch (error) {
        console.error("Error in rendering FCM Token:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const testNotify = (req, res) => {
    console.log("Test notif hit!");

    // These registration tokens come from the client FCM SDKs.
    const registrationTokens = [
        'e9stE0co5WZJpcUL-xYlXB:APA91bF0B--4AsejHMHW1QIRWmIXfrd8i851qqCFUQJJq8ygQiHVTV5tbd0nrLtXWOpzPfk5NPcGnzVnDTk4RRLH6aOL1LYMbv9AJjY_4yf8CsZjkv1GA5Y'
    ];

    const message = {
        notification: {
            title: 'Testing',
            body: 'This is a test notification',
            image: "https://www.pinkvilla.com/pics/500x500/1879722912_highschool-dxd-f_202401.jpg",
        },
        webpush: {
            fcmOptions: {
                link: "/about",
            }
        },
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
                return res.status(500).json({ message: "Some notifications failed to send", failedTokens });
            }
        });
    return res.status(200).json({ message: "Test notification sent!" });
}



