import { Request, Response, NextFunction } from "express";

export function canModifyBooks(request: Request, response: Response, next: NextFunction) {
    if (request.user?.permissions.canModifyBooks) {
        return next();
    }
    return response.status(403).json({ message: "Permission denied: cannot modify books." });
}
