import * as service from "../services/notification.service.js";
import { getAuth } from "@clerk/express";

export const multicast = async (req, res) => {
    console.log("Multicast notification received:", req.body);
    const audience = req.body?.audience || "all";
    if (audience === "reviewers" && !getAuth(req)?.userId) {
        return res.status(401).json({ message: "Authentication is required" });
    }

    const result = await service.multicast(req.body || {});
    return res.status(result.status).json(result);
};




