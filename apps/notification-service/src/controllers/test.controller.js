import * as notificationService from "../services/notification.service.js";

export const testNotify = async (req, res) => {
    console.log("Test notif hit!");

    const result = await notificationService.multicast({
        title: "Testing",
        body: "This is a test notification",
        image: "https://www.pinkvilla.com/pics/500x500/1879722912_highschool-dxd-f_202401.jpg",
        link: "/about"
    });

    return res.status(result.status).json(result);
};




