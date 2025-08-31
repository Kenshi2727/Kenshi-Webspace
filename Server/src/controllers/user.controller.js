import prisma from "../../../Database/prisma.client.js";

export const createUser = async (req, res) => {
    console.log("User creation initiated");
    console.log("Response received:", req.body);
    res.status(201).json({ message: "User created successfully" });
};

export const deleteUser = async (req, res) => {
    console.log("User deletion initiated");
    console.log("Response received:", req.body);
    console.log("Query params received", req.query);
    res.status(200).json({ message: "User deleted successfully" });
};
