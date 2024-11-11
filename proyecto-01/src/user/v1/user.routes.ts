import { Router, Request, Response } from "express";
import { createUser, readUsers, loginUser, updateUser, deleteUser } from "./user.controller";
import { AuthMiddleware } from "../../middleware/auth";
import { canModifyUsers } from "../../middleware/canModifyUsers";
import { canDeleteUsers } from "../../middleware/canDeleteUsers";

// INIT ROUTES
const userRoutes = Router();


// DECLARE ENDPOINT FUNCTIONS
async function GetUsers(request: Request, response: Response) {
    const includeInactive = request.query.includeInactive === 'true';

    try {
        const users = await readUsers(includeInactive);
        response.status(200).json({
            message: "Users successfully obtained",
            users,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error getting users",
            error: (error as Error).message,
        });
    }
}

async function CreateUser(request: Request, response: Response) {
    try {
        const { user, token } = await createUser(request.body);
        response.status(201).json({
            message: "User created successfully",
            user,
            token,
        });
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }
}

async function LoginUser(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
        const user = await loginUser(email, password);
        if (user) {
            response.status(200).json({
                message: "Login successful",
                user,
            });
        } else {
            response.status(401).json({ message: "Invalid credentials." });
        }
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }
}

async function UpdateUser(request: Request, response: Response) {
    const userId = request.params.id;
    const updateData = request.body;

    try {
        const updatedUser = await updateUser(userId, updateData);
        response.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }
}

async function DeleteUser(request: Request, response: Response) {
    const userId = request.params.id;

    try {
        const deletedUser = await deleteUser(userId);
        response.status(200).json({
            message: "User deleted successfully",
            user: deletedUser,
        });
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }
}

// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.post("/", CreateUser);
userRoutes.post("/login", LoginUser);
userRoutes.put("/:id", AuthMiddleware, canModifyUsers, UpdateUser);
userRoutes.delete("/:id", AuthMiddleware, canDeleteUsers, DeleteUser);

// EXPORT ROUTES
export default userRoutes;
