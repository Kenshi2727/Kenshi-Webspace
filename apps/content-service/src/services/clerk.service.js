import { clerkClient } from "@clerk/express";

const deleteClerkUserById = async (id) => {
    try {
        const response = await clerkClient.users.deleteUser(id);
        return response;
    } catch (error) {
        console.error("User Repo level error:", error);
        return null;
    }
};

export {
    deleteClerkUserById
}