import prisma from "@kenshi/database/prisma.client.js";
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

const deleteUserById = async (id) => {
    try {
        const response = await prisma.user.delete({
            where: { id }
        });
        return response;
    } catch (error) {
        console.error("User Repo level error:", error);
        return null;
    }
};

export {
    createUser,
    getUserById,
    deleteUserById
}