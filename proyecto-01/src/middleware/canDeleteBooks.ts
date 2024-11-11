import { Request, Response, NextFunction } from "express";

export function canDeleteBooks(request: Request, response: Response, next: NextFunction) {
    if (request.user?.permissions.canDisableBooks) { 
        return next();
    }
    return response.status(403).json({ message: "Permission denied: cannot delete books." });
}
