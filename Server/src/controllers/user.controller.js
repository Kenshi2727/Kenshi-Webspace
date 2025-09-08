import prisma from "../../../Database/prisma.client.js";
import { clerkClient } from "@clerk/express";
import { Webhook } from "svix";
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (req, res) => {
    console.log("User creation initiated");
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
        return res.status(400).send("Bad Request: Missing required Svix headers");
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
        return res.status(400).send("Bad Request: Invalid Svix webhook");
    }

    const { id } = evt.data;
    const eventType = evt.type;

    //logs
    console.log("Webhook event received:", evt);
    console.log("Event ID:", id);
    console.log("Event Type:", eventType);

    if (eventType === "user.created") {
        try {
            const { email_addresses, primary_email_address_id } = evt.data;
            console.log("Email Addresses:", email_addresses);
            console.log("Primary Email Address ID:", primary_email_address_id);

            // Simulating an error for testing purposes
            // throw new Error("Test error");

            const primaryEmail = email_addresses.find(email => email.id === primary_email_address_id);

            if (!primaryEmail) {
                console.error("Primary email not found");
                return res.status(400).send("Bad Request: Primary email not found");
            }

            //creating user in Database
            // todo:logic
        } catch (error) {
            console.error("Error creating user in database:", error);
            //deleting user from db
            deleteUser(req, res);
            return res.status(500).send("Internal Server Error: Failed to create user");
        }
    }

    return res.status(201).json({ message: "User created successfully" });
};

export const deleteUser = async (req, res) => {
    console.log("User deletion initiated");
    try {
        const userId = res.locals.userId;

        if (!userId) {
            console.warn("⚠️ No userId provided in res.locals");
            return res.status(400).json({ message: "User ID is required" });
        }

        const response = await clerkClient.users.deleteUser(userId);
        console.log("User deleted:", response);
        return res.status(200).json({
            message: "User deleted successfully",
            data: response
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal Server Error: Failed to delete user" });
    }
};
