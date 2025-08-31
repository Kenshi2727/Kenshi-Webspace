import { getAuth } from '@clerk/express';

export const protectRoute = (req, res, next) => {
    try {
        const auth = getAuth(req);
        if (!auth.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        next();
    } catch (error) {
        console.error("Authentication middleware error:", error);
        res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
};