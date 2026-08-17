import { config } from 'dotenv';
import app from './app.js';
config();

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`API GATEWAY is running on PORT:${port}`);
    console.log(`Current Process ID: ${process.pid}`);
    console.log(`CORS is enabled for: ${process.env.CORS_ORIGIN}`);
})

//graceful shutdown
process.on("SIGINT", () => {
    console.log("🔴 SIGINT signal received: closing Server");
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("🟠 SIGTERM signal received: closing Server");
    process.exit(0);
});
