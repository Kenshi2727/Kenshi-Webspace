// IMPORTANT: Make sure to import `instrument.js` at the top of your file.
import "./instrument.js";
// All other imports below
import express from "express";
import dotenv from "dotenv";
import prisma from "../../Database/prisma.client.js";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import mediaRoutes from "./routes/media.route.js";
import serviceRoutes from "./routes/service.route.js";
import { clerkMiddleware } from '@clerk/express';
import bodyParser from 'body-parser';
import helmet from "helmet";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import './services/firebase.js'; // Firebase service initialization

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(helmet());// security middleware for setting various HTTP response headers
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        // allowedHeaders: ["fcm-service-type"],
        credentials: true,
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware({
    audience: process.env.CORS_ORIGIN,
}));
// sending raw buffer to /users/create instead of json as webhook verify expects raw buffer
app.use("/users", bodyParser.raw({ type: "application/json" }), userRoutes);
app.use(express.json());
// rest middlewares for json type
app.use("/posts", postRoutes);
app.use("/media", mediaRoutes);
app.use("/services", serviceRoutes);


// app.use(express.static('public'));// do not place above cors, cors will not work
const publicPath = join(__dirname, "public");
app.use(express.static(publicPath));

//BACKEND HOME PAGE
app.get('/', (req, res) => {
    // res.sendFile(__dirname + "/public/index.html");
    res.sendFile(join(publicPath, "index.html"));
});

//ping route
app.get('/ping', (req, res) => {
    res.status(200).json({ message: "Pong 🏓" });
});

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
