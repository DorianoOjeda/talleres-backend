import { Request, Response, NextFunction } from "express";

export function canCreateBooks(request: Request, response: Response, next: NextFunction) {
    if (request.user?.permissions.canCreateBooks) {
        return next();
    }
    return response.status(403).json({ message: "Permission denied: cannot create books." });
}
