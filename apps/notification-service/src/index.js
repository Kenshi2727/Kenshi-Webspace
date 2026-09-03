import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import notificationRoutes from './routes/notification.route.js';
import tokenRoutes from './routes/token.route.js';
import testRoutes from './routes/test.route.js'
import validateGatewaySecret from './middlewares/validateGatewaySecret.middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(validateGatewaySecret);

// routes
app.use('/tokens', tokenRoutes);
app.use('/notifications', notificationRoutes);
process.env.MODE === 'development' && app.use('/tests', testRoutes);

// listening to server
app.listen(port, () => {
    console.log(`NOTIFICATION SERVER is running on PORT:${port}`);
    console.log(`Current Process ID: ${process.pid}`);
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
