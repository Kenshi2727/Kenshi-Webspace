import express from 'express';
import { createServiceProxy } from '../proxy/proxy.middleware.js';
import services from '../config/services.js';
import { HEADERS } from '../constants/header.constants.js';
import logger from '../observability/logger.js';

const router = express.Router();
const target = services.content;

if (!target) {
    router.use((req, res) => {
        res.status(503).json({
            success: false,
            error: 'Content service is not configured',
            requestId: req.requestId
        });
    });
} else {
    const proxy = createServiceProxy(target, 'content-service', {
        pathRewrite: {
            '^/api/content': '',
            '^/api/content/': '/'
        }
    });

    router.use((req, res, next) => {
        req.headers[HEADERS.SERVICE_TARGET] = 'content-service';
        req.headers[HEADERS.SERVICE] = 'content-service';

        logger.debug('Proxying content service request', {
            requestId: req.requestId,
            originalUrl: req.originalUrl,
            method: req.method
        });

        proxy(req, res, next);
    });
}

export default router;
