// ROLE-BASED ACCESS CONTROL (RBAC) MIDDLEWARE
// This middleware checks if the user has the necessary permissions to access a specific route based on their role.
import prisma from "../../../Database/prisma.client.js";

export const privilegedRouteAccess = (roles) => {
    return async (req, res, next) => {
        try {
            const { id, email } = req.user;

            const isAuthorized = await authorize(id, email, roles);
            if (!isAuthorized) {
                throw new Error("User does not have the required role or permissions.");
            }
            return next();
        } catch (error) {
            console.warn("Unauthorized Access Detected!");
            console.warn("Reason:", error.message);
            console.log("User Object:", req.user);
            // todo: implement logging system        

            return res.status(401).json({
                error: "Unauthorized access",
                message: "You do not have permission to access this resource.",
                reason: "User does not have the required role or permissions.",
            });
        }
    };
}

// helper function to check if user has required role(s)
const authorize = async (id, email, roles) => {
    try {
        const role = await prisma.user.findUnique({
            where: {
                id,
                email
            },
            select: {
                role: true
            },
        }).role;

        if (roles.includes(role)) {
            return true;
        }
    } catch (error) {
        console.error("Error checking user role in authorize() helper function:", error);
        return false;
    }
    return false;
};
