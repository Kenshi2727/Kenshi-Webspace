import * as firebaseService from "./firebase.service.js";
import * as tokenService from "./token.service.js";

const multicast = async ({ title, body, image, link, audience = "all" }) => {
    if (!title || !body) {
        return {
            status: 400,
            message: "Title and body are required to send a notification"
        };
    }

    if (!["all", "reviewers"].includes(audience)) {
        return { status: 400, message: "Audience must be all or reviewers" };
    }

    const registrationTokens = await tokenService.getAllFcmTokens(audience);
    if (!registrationTokens || registrationTokens.length === 0) {
        return {
            status: 404,
            message: audience === "reviewers" ? "No reviewer notification tokens available" : "No FCM tokens available"
        };
    }

    try {
        const message = {
            notification: {
                title,
                body,
                image
            },
            webpush: {
                fcmOptions: {
                    link
                }
            },
            tokens: registrationTokens
        };

        const response = await firebaseService.messaging.sendEachForMulticast(message);
        console.log("Notification multicast response:", response);

        if (response.failureCount > 0) {
            const failedTokens = response.responses
                .map((resp, idx) => (!resp.success ? registrationTokens[idx] : null))
                .filter(Boolean);

            console.log("List of tokens that caused failures:", failedTokens);

            return {
                status: 500,
                message: "Some notifications failed to send",
                failedTokens,
                response
            };
        }

        return {
            status: 200,
            message: "Notification sent!",
            response
        };
    } catch (error) {
        console.error("Notification Service multicast error:", error);
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
};

export { multicast };
