import winston, { createLogger, format, transports } from 'winston';
const { combine, colorize, timestamp, label, printf } = format;

const developmentFormat = printf(({ level, message, timestamp, ...meta }) => {
    return (`
[timestamp] : ${timestamp}] 
[${level}] : ${message} 
[meta] : ${JSON.stringify(meta, null, 2)} 
`);
});

const gatewayDevelopmentLogger = () => {
    return createLogger({
        level: 'debug',
        // format: winston.format.json(),
        format: combine(
            colorize(),
            timestamp({
                format: "hh:mm:ss"
            }),
            developmentFormat
        ),
        defaultMeta: {
            environment: process.env.NODE_ENV
        },
        transports: [
            // new winston.transports.File({ filename: 'error.log', level: 'error' }),
            // new winston.transports.File({ filename: 'combined.log' }),

            new transports.Console(),
        ],
    });
}

export default gatewayDevelopmentLogger;