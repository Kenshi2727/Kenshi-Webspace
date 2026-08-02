import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import notificationRoutes from './routes/notification.route.js';
import tokenRoutes from './routes/token.route.js';
import testRoutes from './routes/test.route.js'

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
app.use('/tokens', tokenRoutes);
app.use('/notifications', notificationRoutes);
app.use('/tests', testRoutes);

// listening to server
app.listen(port, () => {
    console.log(`NOTIFICATION SERVER is running on http://localhost:${port}`);
    console.log(`Current Process ID: ${process.pid}`);
    console.log(`CORS is enabled for: ${process.env.CORS_ORIGIN}`);
});

// root route
app.get('/', (req, res) => {
    res.send('<div style="text-align: center;height: 100vh;display: flex;flex-direction: column;justify-content: center;"><h1>Notification Service is running!</h1><p>@Kenshi Webspace Services</p></div>');
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
