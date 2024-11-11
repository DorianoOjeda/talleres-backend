import { Request, Response, NextFunction } from "express";

export function canModifyUsers(request: Request, response: Response, next: NextFunction) {

    // Allow user to update their own information
    if (request.user?._id.toString() === request.params.id) {
        return next();
    }

    // If the user tries to update another user, check permissions
    if (request.user?.permissions.canModifyUsers) {
        return next();
    }

    return response.status(403).json({ message: "Permission denied: cannot update other users." });
}

