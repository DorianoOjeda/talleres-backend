import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import { UserModel } from "../user/v1/user.model";

export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({ message: "Authorization missing." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return response.status(401).json({ message: "Token not provided." });
    }

    try {
        const secretKey = (env as { JWT_SECRET: string }).JWT_SECRET;
        const decoded = jwt.verify(token, secretKey) as { id: string };
        
        // Fetch user from the database
        const user = await UserModel.findById(decoded.id);
        if (!user || !user.isActive) {
            return response.status(401).json({ message: "Unauthorized or inactive user." });
        }

        // Attach user to request for next middlewares/controllers
        request.user = user;
        next();
    } catch (error) {
        return response.status(401).json({ message: "Invalid token." });
    }
}
