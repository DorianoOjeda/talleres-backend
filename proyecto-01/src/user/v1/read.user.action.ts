import { UserModel, UserType } from "./user.model";
import jwt from "jsonwebtoken";

// Function to read users with optional inclusion of inactive users
async function readUserAction(includeInactive: boolean = false): Promise<UserType[]> {
    const filter = includeInactive ? {} : { isActive: true };  // Include inactive users if requested
    const results = await UserModel.find(filter);
    return results;
}

// Function to find a user by email and password (for login)
async function findUserByCredentials(email: string, password: string): Promise<{ user: UserType; token: string } | null> {
    const user = await UserModel.findOne({ email, password, isActive: true });
  
    if (!user) return null;

    // Generate JWT token using the user's ID and secret key
    const secretKey = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user._id }, secretKey);

    return { user, token };
}

// Export action functions
export { readUserAction, findUserByCredentials };
