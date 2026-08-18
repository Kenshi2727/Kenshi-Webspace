// import * as Sentry from '@sentry/node';
// import { nodeProfilingIntegration } from '@sentry/profiling-node';
// import logger from './logger.js';

// /**
//  * Initialize Sentry for distributed tracing and error tracking
//  */
// export const initSentry = (app) => {
//     if (!process.env.SENTRY_DSN) {
//         logger.warn('Sentry DSN not configured - error tracking disabled');
//         return;
//     }

//     Sentry.init({
//         dsn: process.env.SENTRY_DSN,
//         environment: process.env.NODE_ENV || 'development',
//         tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'),
//         profilesSampleRate: parseFloat(process.env.SENTRY_PROFILES_SAMPLE_RATE || '0.1'),
//         integrations: [
//             nodeProfilingIntegration(),
//             new Sentry.Integrations.Http({ tracing: true }),
//             new Sentry.Integrations.Express({
//                 request: true,
//                 serverName: false
//             })
//         ]
//     });

//     // Attach Sentry request handler before other middleware
//     app.use(Sentry.Handlers.requestHandler());

//     // Attach Sentry tracing middleware
//     app.use(Sentry.Handlers.tracingHandler());

//     logger.info('Sentry initialized successfully', {
//         environment: process.env.NODE_ENV || 'development',
//         tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'
//     });
// };

// /**
//  * Attach Sentry error handler after all other handlers
//  */
// export const attachSentryErrorHandler = (app) => {
//     app.use(Sentry.Handlers.errorHandler());
// };

// /**
//  * Capture exception with context
//  */
// export const captureException = (error, context = {}) => {
//     Sentry.captureException(error, {
//         tags: {
//             service: 'api-gateway',
//             ...context.tags
//         },
//         contexts: {
//             gateway: {
//                 ...context
//             }
//         }
//     });
// };

// /**
//  * Capture message with level
//  */
// export const captureMessage = (message, level = 'info', context = {}) => {
//     Sentry.captureMessage(message, level);
// };

// /**
//  * Add breadcrumb for tracing
//  */
// export const addBreadcrumb = (message, category, level = 'info', data = {}) => {
//     Sentry.addBreadcrumb({
//         message,
//         category,
//         level,
//         data
//     });
// };
