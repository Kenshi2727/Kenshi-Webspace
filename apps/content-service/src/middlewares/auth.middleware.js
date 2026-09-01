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
        return next();
    } catch (error) {
        console.error("Authentication middleware error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error: Authentication failed"
        });
    }
};