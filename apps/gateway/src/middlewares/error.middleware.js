import { HTTP_STATUS } from '../constants/http.constants.js';
// import logger from '../logger/gatewayLogger.js';
// import { captureException } from '../observability/sentry.js';

/**
 * Error handling middleware for API Gateway
 * Catches and formats errors consistently
 */

/**
 * Handle 404 errors
 */
export const handle404 = (req, res) => {
    // logger.warn('Route not found', {
    //     requestId: req.requestId,
    //     method: req.method,
    //     path: req.path
    // });

    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: 'Route not found',
        path: req.path,
        method: req.method,
        requestId: req.requestId
    });
};

/**
 * Global error handler middleware
 * Should be placed at the end of all other middleware
 */
export const errorHandler = (err, req, res, next) => {
    const requestId = req.requestId || 'unknown';

    // Log the error
    // logger.error('Unhandled error', {
    //     requestId,
    //     message: err.message,
    //     stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    //     statusCode: err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    //     path: req.path,
    //     method: req.method
    // });

    // Capture exception in Sentry
    // if (err.statusCode !== HTTP_STATUS.BAD_REQUEST) {
    //     captureException(err, {
    //         requestId,
    //         path: req.path,
    //         method: req.method,
    //         tags: {
    //             errorType: err.name,
    //             statusCode: err.statusCode
    //         }
    //     });
    // }

    // Determine status code
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    // Build error response
    const errorResponse = {
        success: false,
        error: err.message || 'Internal server error',
        requestId
    };

    // Add additional error details in non-production environment
    if (process.env.NODE_ENV !== 'production') {
        errorResponse.stack = err.stack;
        errorResponse.details = err.details;
    }

    res.status(statusCode).json(errorResponse);
};

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Custom API Error class
 */
export class APIError extends Error {
    constructor(message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, details = null) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
        this.details = details;

        // Capture stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Timeout error class
 */
export class TimeoutError extends APIError {
    constructor(message = 'Request timeout', type = 'REQUEST') {
        super(message, HTTP_STATUS.SERVICE_UNAVAILABLE);
        this.name = 'TimeoutError';
        this.type = type;
    }
}

/**
 * Proxy error class
 */
export class ProxyError extends APIError {
    constructor(message, statusCode = HTTP_STATUS.BAD_GATEWAY, targetService) {
        super(message, statusCode);
        this.name = 'ProxyError';
        this.targetService = targetService;
    }
}

/**
 * Validation error class
 */
export class ValidationError extends APIError {
    constructor(message, details) {
        super(message, HTTP_STATUS.BAD_REQUEST, details);
        this.name = 'ValidationError';
    }
}

/**
 * Handle proxy errors specifically
 */
export const handleProxyError = (error, req, res, targetService) => {
    const requestId = req.requestId;

    let statusCode = HTTP_STATUS.BAD_GATEWAY;
    let message = `Failed to reach ${targetService}`;

    // Map common proxy errors to status codes
    if (error.code === 'ECONNREFUSED') {
        statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
        message = `${targetService} service is unavailable`;
    } else if (error.code === 'ENOTFOUND') {
        statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
        message = `${targetService} service not found`;
    } else if (error.code === 'ETIMEDOUT' || error.code === 'EHOSTUNREACH') {
        statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
        message = `${targetService} service timeout`;
    }

    // logger.logProxyError(requestId, targetService, error, statusCode);

    res.status(statusCode).json({
        success: false,
        error: message,
        service: targetService,
        requestId
    });
};
