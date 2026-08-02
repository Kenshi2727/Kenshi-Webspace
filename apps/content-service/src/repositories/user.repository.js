import prisma from "@kenshi/database/prisma.client.js";
import { clerkClient } from "@clerk/express";
import { Webhook } from "svix";
import dotenv from "dotenv";

dotenv.config();

const createUser = async (id, firstName, lastName, email) => {
    //creating user in Database
    try {
        await prisma.user.create({
            data: {
                id,
                firstName,
                lastName,
                email,
            }
        });
        return true;
    } catch (error) {
        console.error("User Repo level error:", error);
        return false;
    }
};

const getUserById = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) return null;

        return user;
    } catch (error) {
        console.error("User Repo level error:", error);
        return null;
    }
}

const deleteUser = async (req, res) => {
    console.log("User deletion initiated");
    try {
        const userId = res.locals.userId;

        if (!userId) {
            console.warn("⚠️ No userId provided in res.locals");
            return {
                status: 400,
                message: "User ID is required"
            };
        }

        const response = await clerkClient.users.deleteUser(userId);
        console.log("User deleted:", response);
        return {
            status: 200,
            message: "User deleted successfully",
            data: response
        };
    } catch (error) {
        console.error("Error deleting user:", error);
        return {
            status: 500,
            message: "Internal Server Error: Failed to delete user"
        };
    }
};

const deleteUserWebhook = async (req, res, evt, id) => {
    console.log("User deletion via webhook initiated");
    try {
        console.log("User ID to delete:", id);
        //deleting user from db
        await prisma.user.delete({
            where: { id }
        });
        console.log("User deleted from database with ID:", id);
        return {
            status: 200,
            message: "User deleted successfully"
        };
    } catch (error) {
        console.error("Error deleting user from database:", error);
        return {
            status: 500,
            message: "Internal Server Error: Failed to delete user from database"
        };
    }
};

const handleWebhook = (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("CLERK_WEBHOOK_SECRET is not defined in environment variables");
    }

    const headerPayload = req.headers;
    const svixId = headerPayload["svix-id"];
    const svixTimestamp = headerPayload["svix-timestamp"];
    const svixSignature = headerPayload["svix-signature"];

    //validation
    if (!svixId || !svixTimestamp || !svixSignature) {
        console.log("User creation failed: Missing Svix headers");
        return {
            status: 400,
            message: "Bad Request: Missing required Svix headers"
        };
    }

    const payload = JSON.parse(req.body.toString("utf-8"));
    console.log("Payload received:", payload);

    const wh = new Webhook(WEBHOOK_SECRET);// creating webhook

    let evt;// webhook type event
    try {
        evt = wh.verify(req.body, {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature
        });
    } catch (error) {
        console.error("Error verifying webhook:", error);
        return {
            status: 400,
            message: "Bad Request: Invalid Svix webhook"
        };
    }

    const { id } = evt.data;
    const eventType = evt.type;

    //logs
    console.log("Webhook event received:", evt);
    console.log("Event ID:", id);
    console.log("Event Type:", eventType);

    switch (eventType) {
        case "user.created": createUser(req, res, evt, id);
            break;
        case "user.deleted": deleteUserWebhook(req, res, evt, id);
            break;
        default:
            console.log(`Unhandled event type: ${eventType}`);
            return {
                status: 500,
                message: `Internal Server Error: Event type ${eventType} not handled`
            };
    }
};

export {
    createUser,
    getUserById,
    deleteUser,
    deleteUserWebhook,
    handleWebhook
}