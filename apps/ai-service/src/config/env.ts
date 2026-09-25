const required = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }
    return value;
};

export const env = {
    port: Number(process.env.PORT ?? 7100),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    corsOrigin: process.env.CORS_ORIGIN ?? '*',
    geminiModel: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash',
    geminiApiKey: () => required('GEMINI_API_KEY'),
};
