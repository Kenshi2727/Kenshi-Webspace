import type { NextFunction, Request, Response } from 'express';

export const gatewayAuth = (req: Request, res: Response, next: NextFunction): void => {
    const configuredSecret = process.env.GATEWAY_SECRET?.replace(/^:/, '');
    const requestSecret = req.header('x-gateway-secret')?.replace(/^:/, '');

    if (!configuredSecret || requestSecret !== configuredSecret) {
        res.status(401).json({ success: false, error: 'AI service requests must go through the API gateway' });
        return;
    }

    next();
};
