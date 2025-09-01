import prisma from "../../../Database/prisma.client.js";
import { clerkClient } from "@clerk/express";

export const createUser = async (req, res) => {
    console.log("User creation initiated");
    console.log("Response received:", req.body);
    res.status(201).json({ message: "User created successfully" });
};

export const deleteUser = async (req, res) => {
    console.log("User deletion initiated");
    try {
        const userId = res.locals.userId;
        const response = await clerkClient.users.deleteUser(userId);
        console.log("User deleted:", response);
        res.status(200).json({
            message: "User deleted successfully",
            data: response
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error: Failed to delete user" });
    }
};
