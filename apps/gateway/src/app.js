import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';

config();
const app = express();

// default http headers
app.use(helmet());
app.use(cors());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. 
}
));

app.use("/", (req, res) => {
    res.send('<div style="text-align: center;height: 100vh;display: flex;flex-direction: column;justify-content: center;"><h1>API Gateway is running!</h1><p>@Kenshi Webspace Services</p></div>');
});

app.use("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API Gateway is running successfully!"
    })
});

//Gateway Proxy Setup

app.use("/auth",
    createProxyMiddleware({
        target: process.env.AUTH_SERVICE_URL || "/billu.com",
        changeOrigin: true,
        pathRewrite: (path) => `/billu${path}`
    })
);

export default app;
