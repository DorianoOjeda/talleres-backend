import { Request, Response, NextFunction } from "express";

export function canDeleteUsers(request: Request, response: Response, next: NextFunction) {

    // Allow the user to disable himself/herself
    if (request.user?._id.toString() === request.params.id) {
        return next();
    }

    // If the user is not disabling himself/herself, check the permission
    if (request.user?.permissions.canDisableUsers) {
        return next();
    }

    return response.status(403).json({ message: "Permission denied: cannot delete other users." });
}
