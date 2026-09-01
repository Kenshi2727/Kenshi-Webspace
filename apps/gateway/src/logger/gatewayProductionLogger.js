import winston, { createLogger, format, transports } from 'winston';
const { combine, colorize, timestamp, label, printf } = format;

const productionFormat = printf(({ level, message, timestamp, ...meta }) => {
    return (`
[timestamp] : ${timestamp}] 
[${level}] : ${message} 
[meta] : ${JSON.stringify(meta, null, 2)} 
`);
});

const gatewayProductionLogger = () => {
    return createLogger({
        level: 'info',
        // format: winston.format.json(),
        format: combine(
            // colorize(), //not for production
            timestamp(),
            productionFormat
        ),
        defaultMeta: {
            environment: process.env.NODE_ENV
        },
        transports: [
            // todo:transport over http when logger service is ready
            new transports.Console(),
        ],
    });
}

export default gatewayProductionLogger;