import { messaging } from "../services/firebase.js";
import { renderALLFcmTokens } from './token.controller.js';


export const testNotify = async (req, res) => {
    console.log("Test notif hit!");

    try {
        // These registration tokens come from the client FCM SDKs.
        const registrationTokens = await renderALLFcmTokens();

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
                else {
                    return res.status(200).json({ message: "Test notification sent!" });
                }
            });
    } catch (error) {
        console.log("Some error occured in testNotify:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }


}




