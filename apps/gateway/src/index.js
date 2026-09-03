import { config } from 'dotenv';
import app from './app.js';
import logger from './logger/index.js'

config();

const port = process.env.PORT || 7000;
const environment = process.env.NODE_ENV || 'development';

app.listen(port, () => {
    console.log('\n' + '='.repeat(60));
    console.log('✅ API GATEWAY IS RUNNING');
    console.log('='.repeat(60));
    console.log(`📍 Port: ${port}`);
    console.log(`🌍 Environment: ${environment}`);
    console.log(`🔄 Process ID: ${process.pid}`);
    console.log(`👤 Node Version: ${process.version}`);
    console.log(`📊 CORS Origin: ${process.env.CORS_ORIGIN}`);
    console.log('='.repeat(60) + '\n');

    logger.info('API Gateway started successfully!', {
        port,
        environment,
        nodeVersion: process.version,
        pid: process.pid,
        uptime: process.uptime()
    });
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



