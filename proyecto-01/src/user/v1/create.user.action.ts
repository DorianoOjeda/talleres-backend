import { UserModel, UserType } from "./user.model";
import { CreateUserType } from "./user.types";
import jwt from "jsonwebtoken";

// DECLARE ACTION FUNCTION
async function createUserAction(userData: CreateUserType): Promise<{ user: UserType; token: string }> {
    // Create the user in the database
    const user = await UserModel.create(userData);

    // Generate JWT token using the user's ID and secret key
    const secretKey = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user._id }, secretKey);

    return { user, token };
}

// EXPORT ACTION FUNCTION
export default createUserAction;
