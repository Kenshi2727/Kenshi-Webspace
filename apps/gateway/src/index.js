import { config } from 'dotenv';
import app from './app.js';
import logger from './observability/logger.js';

config();

const port = process.env.PORT || 7000;
const environment = process.env.NODE_ENV || 'development';

let server;

try {
    server = app.listen(port, () => {
        logger.info('🚀 API Gateway started successfully', {
            port,
            environment,
            nodeVersion: process.version,
            pid: process.pid,
            uptime: process.uptime()
        });

        console.log('\n' + '='.repeat(60));
        console.log('✅ API GATEWAY IS RUNNING');
        console.log('='.repeat(60));
        console.log(`📍 Port: ${port}`);
        console.log(`🌍 Environment: ${environment}`);
        console.log(`🔄 Process ID: ${process.pid}`);
        console.log(`👤 Node Version: ${process.version}`);
        console.log(`📊 CORS Origin: ${process.env.CORS_ORIGIN || '*'}`);
        console.log('='.repeat(60) + '\n');
    });

    // Handle server errors
    server.on('error', (error) => {
        logger.error('Server error', {
            error: error.message,
            code: error.code,
            port
        });

        if (error.code === 'EADDRINUSE') {
            console.error(`\n❌ Error: Port ${port} is already in use`);
            process.exit(1);
        } else if (error.code === 'EACCES') {
            console.error(`\n❌ Error: Permission denied to use port ${port}`);
            process.exit(1);
        } else {
            console.error(`\n❌ Server error: ${error.message}`);
            process.exit(1);
        }
    });

} catch (error) {
    logger.error('Failed to start gateway', {
        error: error.message,
        stack: error.stack
    });
    console.error('\n❌ Failed to start API Gateway:', error.message);
    process.exit(1);
}

// ========================
// Graceful Shutdown Handlers
// ========================

const gracefulShutdown = (signal) => {
    logger.info(`Received ${signal} signal - starting graceful shutdown`, {
        pid: process.pid
    });

    console.log(`\n🛑 ${signal} received - shutting down gracefully...\n`);

    if (server) {
        // Stop accepting new requests
        server.close(() => {
            logger.info('Server closed successfully', {
                signal,
                pid: process.pid
            });

            console.log('✅ Server closed');
            process.exit(0);
        });

        // Force shutdown after 30 seconds
        const shutdownTimeout = setTimeout(() => {
            logger.warn('Forced shutdown after 30 seconds', {
                signal,
                pid: process.pid
            });

            console.error('⚠️  Force closing server after 30 seconds...');
            process.exit(1);
        }, 30000);

        // Don't keep the process alive for this timeout
        shutdownTimeout.unref();
    } else {
        process.exit(0);
    }
};

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle SIGTERM (Kubernetes, Docker, systemd)
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle SIGHUP (terminal closed)
process.on('SIGHUP', () => gracefulShutdown('SIGHUP'));

// ========================
// Uncaught Exception Handler
// ========================

process.on('uncaughtException', (error) => {
    logger.error('🔴 UNCAUGHT EXCEPTION', {
        error: error.message,
        stack: error.stack,
        pid: process.pid
    });

    console.error('\n❌ UNCAUGHT EXCEPTION:');
    console.error(error);

    // Exit process after logging
    process.exit(1);
});

// ========================
// Unhandled Promise Rejection Handler
// ========================

process.on('unhandledRejection', (reason, promise) => {
    logger.error('🟠 UNHANDLED PROMISE REJECTION', {
        reason: reason instanceof Error ? reason.message : String(reason),
        promise: String(promise),
        stack: reason instanceof Error ? reason.stack : undefined,
        pid: process.pid
    });

    console.error('\n⚠️  UNHANDLED PROMISE REJECTION:');
    console.error(reason);
});

// ========================
// Process Warnings
// ========================

process.on('warning', (warning) => {
    logger.warn('Process warning', {
        name: warning.name,
        message: warning.message,
        stack: warning.stack
    });
});
