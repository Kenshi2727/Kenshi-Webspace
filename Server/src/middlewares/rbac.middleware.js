// ROLE-BASED ACCESS CONTROL (RBAC) MIDDLEWARE
// This middleware checks if the user has the necessary permissions to access a specific route based on their role.
import prisma from "../../../Database/prisma.client.js";

export const privilegedRouteAccess = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Get userId set by protectRoute (Clerk verified)
            const userId = res.locals.userId;
            
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access: Missing user ID"
                });
            }

            // Real-time role verification against the database
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    role:true
                }
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            if (!allowedRoles.includes(user.role)) {
                console.warn(`Unauthorized Access Detected! User ${userId} with role ${user.role} tried to access route requiring ${allowedRoles}`);
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: Insufficient privileges"
                });
            }

            // Save role to locals in case downstream controllers need it
            res.locals.role = user.role;
            return next();
        } catch (error) {
            console.error("RBAC middleware error:", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error: Role verification failed"
            });
        }
    };
};
