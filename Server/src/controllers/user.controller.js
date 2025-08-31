import prisma from "../../../Database/prisma.client.js";

export const createUser = async (req, res) => {
    console.log("User creation initiated");
    console.log("Response received:", req.body);
    res.status(201).json({ message: "User created successfully" });
};
