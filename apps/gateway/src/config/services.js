import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';

config({
    path: fileURLToPath(new URL('../../.env', import.meta.url)),
    override: true,
});

const services = {
    auth: process.env.AUTH_SERVICE_URL,
    content: process.env.CONTENT_SERVICE_URL,
    notification: process.env.NOTIFICATION_SERVICE_URL,
    ai: process.env.AI_SERVICE_URL,
};


export default services;    