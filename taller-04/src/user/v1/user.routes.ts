import { Router, Request, Response } from "express";
import { readUsers, getUsersByHobby } from "./user.controller";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function GetUsers(request: Request, response: Response) {
  const users = await readUsers();

  response.status(200).json({
    message: "Success.",
    users: users,
  });
}

// Get users by hobby
async function GetUsersByHobby(request: Request, response: Response) {
  const { hobby } = request.query;

  if (!hobby) {
    return response.status(400).json({
      message: "Hobby is required.",
    });
  }

  const users = await getUsersByHobby(hobby as string);
  
  if (users.length === 0) {
    return response.status(404).json({
      message: `No users found with the hobby: ${hobby}`,
    });
  }

  response.status(200).json({
    message: "Success.",
    users: users,
  });
}

// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.get("/hobby", GetUsersByHobby);

// EXPORT ROUTES
export default userRoutes;
