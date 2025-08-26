import express from "express";
import dotenv from "dotenv";
import prisma from "../../Database/prisma.client.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Prisma Client is connected: ${prisma !== null}`);
});
