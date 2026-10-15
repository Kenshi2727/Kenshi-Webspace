import { getAuth } from '@clerk/express';

export const protectRoute = (req, res, next) => {
    try {
        console.log(req.headers);

        if (req.headers['fcm-service-type'] === 'public') {
            console.log("hit!");

            return next();// allow public fcm service req
        }

        // console.log("Header containing token:", req.headers);
        const auth = getAuth(req);
        console.log('protectRoute getAuth =>', auth);
        if (!auth?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        res.locals.userId = auth.userId;
        req.authenticatedUserId = auth.userId;
        return next();
    } catch (error) {
        console.error("Authentication middleware error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error: Authentication failed"
        });
    }
};

export const optionalProtectRoute = (req, res, next) => {
    try {
        const auth = getAuth(req);
        req.authenticatedUserId = auth?.userId || null;
        if (req.authenticatedUserId) res.locals.userId = req.authenticatedUserId;
        return next();
    } catch (error) {
        console.error("Optional authentication middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: Authentication failed"
        });
    }
};