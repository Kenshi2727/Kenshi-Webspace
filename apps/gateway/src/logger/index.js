import gatewayDevelopmentLogger from "./gatewayDevelopmentLogger.js";
import gatewayProductionLogger from './gatewayProductionLogger.js';
import { config } from 'dotenv';
config();

let logger = null;

if (process.env.NODE_ENV === 'development') {
    logger = gatewayDevelopmentLogger();
}

if (process.env.NODE_ENV === 'production') {
    logger = gatewayProductionLogger();
}

export default logger;