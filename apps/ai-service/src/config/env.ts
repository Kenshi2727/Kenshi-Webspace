import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';

config({
    path: fileURLToPath(new URL('../../.env', import.meta.url)),
    override: true,
});

const required = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }
    return value;
};

const googleApiKey = process.env.GOOGLE_API_KEY ?? process.env.GEMINI_API_KEY;
if (googleApiKey) {
    process.env.GOOGLE_API_KEY = googleApiKey;
}

export const env = {
    port: Number(process.env.PORT ?? 7100),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    corsOrigin: process.env.CORS_ORIGIN ?? '*',
    aiModel: process.env.AI_MODEL ?? 'google-genai:gemini-3.5-flash-lite',
    googleApiKey: () => required('GOOGLE_API_KEY'),
};
