export const renderFcmToken = (req, res) => {
    try {
        //controller to save fcm token to database
        console.log("FCM Token received:", req.body);
        res.status(200).json({ message: "FCM token received" });
    } catch (error) {
        console.error("Error in renderFcmToken:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}