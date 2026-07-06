import dotenv from 'dotenv';
dotenv.config();

export const protectTestRoute = (req, res, next) => {
    if (process.env.MODE === 'production') {
        return res.status(403).json({ message: "This route is disabled in production!" });
    }

    if (process.env.MODE === 'development') {
        console.log("Test route accessed in development mode.");
        return next();
    }

    console.warn("⚠️ MODE is not set properly. Disabling test route by default.");
    return res.status(403).json({ message: "This route is disabled in production!" });
}