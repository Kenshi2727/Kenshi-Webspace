import { clerkClient } from "@clerk/express";
import { Webhook } from "svix";
import dotenv from "dotenv";
import * as repo from "../repositories/user.repository.js";

dotenv.config();

const createUser = async (req, res, evt, id) => {
    console.log("User creation initiated");
    try {
        const { email_addresses, primary_email_address_id, first_name, last_name } = evt.data;
        console.log("Email Addresses:", email_addresses);
        console.log("Primary Email Address ID:", primary_email_address_id);

        // Simulating an error for testing purposes
        // throw new Error("Test error");

        const primaryEmail = email_addresses.find(email => email.id === primary_email_address_id);

        if (!primaryEmail) {
            console.error("Primary email not found");
            return {
                status: 400,
                message: "Bad Request: Primary email not found"
            };
        }

        //creating user in Database
        const userCreated = await repo.createUser(id, first_name, last_name, primaryEmail.email_address);
        if (!userCreated) {
            console.error("Error creating user in database");
            throw new Error("Failed to create user in database");
        }
        console.log("User created in database with ID:", id);
    } catch (error) {
        console.error("Error creating user:", error);
        //deleting user from db
        res.locals.userId = id;
        // res.status(500).send("Internal Server Error: Failed to create user");
        return deleteUser(req, res);
    }
    return {
        status: 201,
        message: "User created successfully"
    };
};

const getUser = async (req, res) => {
    console.log("User info request for id:", req.params.userId);
    try {
        const user = await repo.getUserById(req.params.userId);

        if (!user) {
            console.warn("⚠️ User not found with ID:", req.params.userId);
            return {
                status: 404,
                message: "User not found[SECURITY BREACH!]"
            };
        }
        return {
            status: 200,
            message: "User found",
            user
        };
    } catch (error) {
        console.error("Error retrieving user:", error);
        return {
            status: 500,
            message: "Internal Server Error: Failed to retrieve user"
        };
    }
}

// start here
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
    getUser,
    deleteUser,
    deleteUserWebhook,
    handleWebhook
}