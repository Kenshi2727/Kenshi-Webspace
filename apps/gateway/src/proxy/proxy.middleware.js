import { createProxyMiddleware } from 'http-proxy-middleware';
import { TIMEOUTS } from '../constants/timeout.constants.js';
import { HEADERS } from '../constants/header.constants.js';
import logger from '../logger/index.js';
// import { addBreadcrumb } from '../observability/sentry.js';
import http from 'http';
import https from 'https';
import { HTTP_STATUS } from '../constants/http.constants.js'

/*
* proxy middleware with timeouts
*/
const createServiceProxy = (target, serviceName, options = {}) => {
    const { pathRewrite = {} } = options;

    // HTTP/HTTPS Node Networking agents with connection pooling and timeouts
    const { protocol } = new URL(target);
    const Agent = protocol === 'https' ? https.Agent : http.Agent;

    const agent = new Agent({
        keepAlive: true,
        keepAliveMsecs: 30000,
        maxSockets: 50,
        maxFreeSockets: 10,
        // timeout: TIMEOUTS.CONNECTION,
    });

    return createProxyMiddleware({
        target,
        changeOrigin: true,
        agent,
        pathRewrite,

        // Timeout settings
        timeout: TIMEOUTS.REQUEST,
        proxyTimeout: TIMEOUTS.PROXY,


        /* httpxy events */
        on: {
            proxyReq: (proxyReq, req, res) => {
                // socket timeout for the proxy request
                proxyReq.setTimeout(TIMEOUTS.PROXY);

                // Add request headers
                proxyReq.setHeader(HEADERS.REQUEST_ID, req.requestId);
                proxyReq.setHeader(HEADERS.FORWARDED_FOR, req.ip);
                proxyReq.setHeader(HEADERS.FORWARDED_PROTO, req.protocol);
                proxyReq.setHeader(HEADERS.GATEWAY_SECRET, 'api-gateway-secret');
                proxyReq.setHeader(HEADERS.TARGET_SERVICE, serviceName);

                // Log proxy request
                logger.debug(`Proxying request to ${serviceName}`, {
                    requestId: req.requestId,
                    service: serviceName,
                    target,
                    method: req.method,
                    path: req.path,
                    timeout: TIMEOUTS.PROXY
                });


                // Network Agent Status
                logger.debug('Agent status:', {
                    sockets: Object.keys(agent.sockets).length,
                    freeSockets: Object.keys(agent.freeSockets).length,
                    requests: Object.keys(agent.requests).length,

                    socketPools: Object.fromEntries(
                        Object.entries(agent.sockets).map(([key, sockets]) => [
                            key,
                            sockets.length
                        ])
                    ),

                    freeSocketPools: Object.fromEntries(
                        Object.entries(agent.freeSockets).map(([key, sockets]) => [
                            key,
                            sockets.length
                        ])
                    ),

                    requestPools: Object.fromEntries(
                        Object.entries(agent.requests).map(([key, requests]) => [
                            key,
                            requests.length
                        ])
                    )
                });

                /*Sentry Service */
                // addBreadcrumb(
                //     `Proxy to ${serviceName}`,
                //     'proxy.request',
                //     'info',
                //     { service: serviceName, target }
                // );
            },

            // proxy response
            proxyRes: (proxyRes, req, res) => {
                proxyRes.headers[HEADERS.RESPONSE_SERVICE] = serviceName;

                logger.debug(`Received response from ${serviceName}`, {
                    requestId: req.requestId,
                    service: serviceName,
                    statusCode: proxyRes.statusCode
                });

                // addBreadcrumb(
                //     `Response from ${serviceName}`,
                //     'proxy.response',
                //     proxyRes.statusCode >= 400 ? 'warning' : 'info',
                //     {
                //         service: serviceName,
                //         statusCode: proxyRes.statusCode
                //     }
                // );
            },

            // Handle errors
            error: (err, req, res) => {
                logger.error(`Proxy error for ${serviceName}`, {
                    requestId: req.requestId,
                    service: serviceName,
                    error: err.message,
                    code: err.code
                });

                // addBreadcrumb(
                //     `Proxy error from ${serviceName}`,
                //     'proxy.error',
                //     'error',
                //     {
                //         service: serviceName,
                //         error: err.message,
                //         code: err.code
                //     }
                // );

                if (!res.headersSent) {
                    res.status(HTTP_STATUS.BAD_GATEWAY).json({
                        success: false,
                        error: {
                            code: 'BAD_GATEWAY',
                            message: `Unable to reach ${serviceName}`,
                            requestId: req.requestId
                        }
                    });
                }

            }
        }
    });
};

export {
    createServiceProxy
}
