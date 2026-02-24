import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

// listening to server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Current Process ID: ${process.pid}`);
    console.log(`CORS is enabled for: ${process.env.CORS_ORIGIN}`);
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
