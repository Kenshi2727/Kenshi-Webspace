import express from "express";
import dotenv from "dotenv";
import prisma from "../../Database/prisma.client.js";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));

// app.get('/users/create', () => console.log('hit!'))

app.use("/users", userRoutes);

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`CORS is enabled for: ${process.env.CORS_ORIGIN}`);
    console.log(`Prisma Client is connected: ${prisma !== null}`);
});
