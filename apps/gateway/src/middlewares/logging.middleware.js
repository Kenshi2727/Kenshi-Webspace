import logger from '../observability/logger.js';
// import { addBreadcrumb } from '../observability/sentry.js';

/**
 * Request logging middleware
 * Logs incoming requests and their responses with timing information
 */

export const requestLoggingMiddleware = (req, res, next) => {
    // Record request start time
    const startTime = Date.now();

    // Store original end function
    const originalEnd = res.end;

    // Override res.end to capture response
    res.end = function (chunk, encoding) {
        // Calculate duration
        const duration = Date.now() - startTime;

        // Get response size
        let responseSize = 0;
        if (chunk) {
            responseSize = Buffer.byteLength(chunk, encoding || 'utf8');
        }

        // Prepare log data
        const logData = {
            requestId: req.requestId,
            method: req.method,
            path: req.path,
            query: Object.keys(req.query).length > 0 ? req.query : undefined,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            remoteAddress: req.ip,
            userAgent: req.get('user-agent'),
            contentType: req.get('content-type'),
            responseSize: `${responseSize}B`
        };

        // Log request based on status code
        if (res.statusCode >= 400) {
            logger.warn(`${req.method} ${req.path} ${res.statusCode}`, logData);
        } else {
            logger.info(`${req.method} ${req.path} ${res.statusCode}`, logData);
        }

        // Add breadcrumb for Sentry
        // addBreadcrumb(
        //     `${req.method} ${req.path}`,
        //     'http.request',
        //     res.statusCode >= 400 ? 'warning' : 'info',
        //     {
        //         statusCode: res.statusCode,
        //         duration,
        //         method: req.method,
        //         path: req.path
        //     }
        // );

        // Call original end
        return originalEnd.call(this, chunk, encoding);
    };

    next();
};

/**
 * Request body logging middleware
 * Logs request body for POST/PUT/PATCH requests (excluding sensitive data)
 */
export const requestBodyLoggingMiddleware = (req, res, next) => {
    // Skip logging for GET and HEAD requests
    if (['GET', 'HEAD'].includes(req.method)) {
        return next();
    }

    // Capture body data
    let bodyData = '';

    // Listen to data events
    req.on('data', chunk => {
        bodyData += chunk.toString();
    });

    // Process body after it's fully received
    req.on('end', () => {
        if (bodyData && req.get('content-type')?.includes('application/json')) {
            try {
                const parsedBody = JSON.parse(bodyData);
                const sanitizedBody = sanitizeBodyData(parsedBody);

                logger.debug('Request body received', {
                    requestId: req.requestId,
                    path: req.path,
                    method: req.method,
                    bodySize: bodyData.length,
                    bodyPreview: JSON.stringify(sanitizedBody).substring(0, 200)
                });

                // addBreadcrumb(
                //     'Request body received',
                //     'http.request.body',
                //     'debug',
                //     { size: bodyData.length }
                // );
            } catch (error) {
                logger.debug('Failed to parse request body', {
                    requestId: req.requestId,
                    error: error.message
                });
            }
        }
    });

    next();
};

/**
 * Response header logging middleware
 * Logs response headers for debugging
 */
export const responseHeaderLoggingMiddleware = (req, res, next) => {
    // Store original writeHead
    const originalWriteHead = res.writeHead;

    res.writeHead = function (statusCode, headers) {
        logger.debug('Response headers', {
            requestId: req.requestId,
            statusCode,
            headers: sanitizeHeaders(headers || {})
        });

        return originalWriteHead.apply(this, arguments);
    };

    next();
};

/**
 * Sanitize body data by removing sensitive fields
 */
const sanitizeBodyData = (body) => {
    if (!body || typeof body !== 'object') {
        return body;
    }

    const sensitiveFields = [
        'password',
        'token',
        'apiKey',
        'api_key',
        'secret',
        'authorization',
        'creditCard',
        'ssn',
        'email'
    ];

    const sanitized = JSON.parse(JSON.stringify(body));

    const sanitizeObject = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(sanitizeObject);
        }

        if (obj !== null && typeof obj === 'object') {
            Object.keys(obj).forEach(key => {
                if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
                    obj[key] = '[REDACTED]';
                } else if (typeof obj[key] === 'object') {
                    obj[key] = sanitizeObject(obj[key]);
                }
            });
        }

        return obj;
    };

    return sanitizeObject(sanitized);
};

/**
 * Sanitize headers by removing sensitive values
 */
const sanitizeHeaders = (headers) => {
    const sensitiveHeaderNames = [
        'authorization',
        'cookie',
        'set-cookie',
        'x-api-key',
        'x-token'
    ];

    const sanitized = { ...headers };

    Object.keys(sanitized).forEach(key => {
        if (sensitiveHeaderNames.some(sensitive => key.toLowerCase().includes(sensitive))) {
            sanitized[key] = '[REDACTED]';
        }
    });

    return sanitized;
};
