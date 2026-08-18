import { HTTP_STATUS } from '../constants/http.constants.js';
import logger from '../observability/logger.js';

/**
 * Validation middleware for request validation
 * Checks for required headers, content type, and payload validation
 */

const REQUIRED_HEADERS = ['content-type'];

/**
 * Validate incoming request
 */
export const validateRequest = (req, res, next) => {
    try {
        // Skip validation for GET and HEAD requests
        if (['GET', 'HEAD', 'DELETE'].includes(req.method)) {
            return next();
        }

        // Check for required headers
        const contentType = req.get('content-type');
        if (!contentType) {
            logger.warn('Missing content-type header', {
                requestId: req.requestId,
                method: req.method,
                path: req.path
            });

            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                error: 'Missing required header: content-type',
                requestId: req.requestId
            });
        }

        // Validate content type
        const validContentTypes = ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'];
        const isValidContentType = validContentTypes.some(type => contentType.includes(type));

        if (!isValidContentType) {
            logger.warn('Invalid content-type header', {
                requestId: req.requestId,
                contentType,
                method: req.method,
                path: req.path
            });

            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                error: `Invalid content-type. Allowed types: ${validContentTypes.join(', ')}`,
                requestId: req.requestId
            });
        }

        // Validate request body size (limit to 10MB for safety)
        const contentLength = parseInt(req.get('content-length') || '0', 10);
        const MAX_BODY_SIZE = 10 * 1024 * 1024; // 10MB

        if (contentLength > MAX_BODY_SIZE) {
            logger.warn('Request body exceeds size limit', {
                requestId: req.requestId,
                contentLength,
                maxAllowed: MAX_BODY_SIZE
            });

            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                error: `Request body exceeds maximum size of ${MAX_BODY_SIZE / 1024 / 1024}MB`,
                requestId: req.requestId
            });
        }

        next();
    } catch (error) {
        logger.error('Validation middleware error', {
            requestId: req.requestId,
            error: error.message
        });

        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: 'Internal server error during validation',
            requestId: req.requestId
        });
    }
};

/**
 * Validate path parameter exists
 */
export const validatePathParam = (paramName) => (req, res, next) => {
    const paramValue = req.params[paramName];

    if (!paramValue) {
        logger.warn('Missing required path parameter', {
            requestId: req.requestId,
            paramName,
            path: req.path
        });

        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            error: `Missing required path parameter: ${paramName}`,
            requestId: req.requestId
        });
    }

    next();
};

/**
 * Validate query parameters exist
 */
export const validateQueryParams = (requiredParams) => (req, res, next) => {
    const missingParams = requiredParams.filter(param => !req.query[param]);

    if (missingParams.length > 0) {
        logger.warn('Missing required query parameters', {
            requestId: req.requestId,
            missingParams,
            path: req.path
        });

        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            error: `Missing required query parameters: ${missingParams.join(', ')}`,
            requestId: req.requestId
        });
    }

    next();
};

/**
 * Schema validation helper (for future integration with joi, yup, zod, etc.)
 */
export const validateSchema = (schema) => (req, res, next) => {
    try {
        // This is a placeholder for schema validation
        // Can be integrated with joi, yup, or zod
        // For now, basic validation is performed by validateRequest middleware
        next();
    } catch (error) {
        logger.error('Schema validation error', {
            requestId: req.requestId,
            error: error.message
        });

        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            error: 'Request validation failed',
            details: error.message,
            requestId: req.requestId
        });
    }
};
