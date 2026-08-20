import express from 'express';
import { createServiceProxy } from '../proxy/proxy.middleware.js';
import services from '../config/services.js';
import { HEADERS } from '../constants/header.constants.js';
import { HTTP_STATUS } from '../constants/http.constants.js'
import logger from '../logger/index.js';

const router = express.Router();
const target = services.content;

if (!target) {
    router.use((req, res) => {
        res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({
            success: false,
            error: 'Content service is not configured',
            requestId: req.requestId
        });
    });
} else {
    const proxy = createServiceProxy(target, 'content-service', {
        pathRewrite: {
            "^/content": ""
        }
    });

    router.use((req, res, next) => {
        logger.info('Content service route registered', { target });
        req.headers[HEADERS.TARGET_SERVICE] = 'content-service';

        logger.debug('Proxying content service request', {
            requestId: req.requestId,
            originalUrl: req.originalUrl,
            method: req.method
        });

        proxy(req, res, next);
    });
}

export default router;
