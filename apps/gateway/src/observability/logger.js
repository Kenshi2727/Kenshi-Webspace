/**
 * Production-grade logger for API Gateway
 * Logs with timestamps, request IDs, and structured format
 */

const LOG_LEVELS = {
    ERROR: 'ERROR',
    WARN: 'WARN',
    INFO: 'INFO',
    DEBUG: 'DEBUG'
};

class Logger {
    constructor(serviceName = 'api-gateway') {
        this.serviceName = serviceName;
        this.logLevel = process.env.LOG_LEVEL || 'INFO';
    }

    #formatTimestamp() {
        return new Date().toISOString();
    }

    #formatLog(level, message, data = {}) {
        return JSON.stringify({
            timestamp: this.#formatTimestamp(),
            service: this.serviceName,
            level,
            message,
            requestId: data.requestId,
            ...data
        });
    }

    #shouldLog(level) {
        const levels = Object.values(LOG_LEVELS);
        const currentLevelIndex = levels.indexOf(this.logLevel);
        const messageLevelIndex = levels.indexOf(level);
        return messageLevelIndex <= currentLevelIndex;
    }

    error(message, data = {}) {
        if (this.#shouldLog(LOG_LEVELS.ERROR)) {
            console.error(this.#formatLog(LOG_LEVELS.ERROR, message, data));
        }
    }

    warn(message, data = {}) {
        if (this.#shouldLog(LOG_LEVELS.WARN)) {
            console.warn(this.#formatLog(LOG_LEVELS.WARN, message, data));
        }
    }

    info(message, data = {}) {
        if (this.#shouldLog(LOG_LEVELS.INFO)) {
            console.log(this.#formatLog(LOG_LEVELS.INFO, message, data));
        }
    }

    debug(message, data = {}) {
        if (this.#shouldLog(LOG_LEVELS.DEBUG)) {
            console.log(this.#formatLog(LOG_LEVELS.DEBUG, message, data));
        }
    }

    /**
     * Log HTTP request details
     */
    logRequest(req, res, duration) {
        const logData = {
            requestId: req.requestId,
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            remoteAddress: req.ip,
            userAgent: req.get('user-agent')
        };

        const level = res.statusCode >= 400 ? LOG_LEVELS.WARN : LOG_LEVELS.INFO;
        this.info(`${req.method} ${req.path} ${res.statusCode}`, logData);
    }

    /**
     * Log proxy errors
     */
    logProxyError(requestId, targetService, error, statusCode) {
        this.error(`Proxy request failed to ${targetService}`, {
            requestId,
            targetService,
            statusCode,
            errorMessage: error?.message,
            errorCode: error?.code
        });
    }

    /**
     * Log timeout events
     */
    logTimeout(requestId, type, duration) {
        this.warn(`${type} timeout exceeded`, {
            requestId,
            type,
            duration: `${duration}ms`
        });
    }
}

export default new Logger();