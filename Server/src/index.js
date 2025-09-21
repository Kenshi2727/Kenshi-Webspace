import express from "express";
import dotenv from "dotenv";
import prisma from "../../Database/prisma.client.js";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import mediaRoutes from "./routes/media.route.js";
import { clerkMiddleware } from '@clerk/express';
import bodyParser from 'body-parser';
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(helmet());// security middleware for setting various HTTP response headers
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());
// sending raw buffer to /users/create instead of json as webhook verify expects raw buffer
app.use("/users", bodyParser.raw({ type: "application/json" }), userRoutes);
app.use(express.json());
// rest middlewares for json type
app.use("/posts", postRoutes);
app.use("/media", mediaRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Current Process ID: ${process.pid}`);
    console.log(`CORS is enabled for: ${process.env.CORS_ORIGIN}`);
    console.log(`Prisma Client is connected: ${prisma !== null && prisma !== undefined}`);
});

//graceful shutdown
process.on("SIGINT", () => {
    console.log("🔴 SIGINT signal received: closing Server");
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("🟠 SIGTERM signal received: closing Server");
    process.exit(0);
});
