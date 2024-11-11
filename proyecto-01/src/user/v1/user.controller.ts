import createUserAction from "./create.user.action";
import { readUserAction, findUserByCredentials } from "./read.user.action";
import { updateUserAction } from "./update.user.action";
import deleteUserAction from "./delete.user.action";
import { UserModel, UserType } from "./user.model";
import { CreateUserType, UpdateUserType } from "./user.types";

// Email validation function
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Function to get all users, with optional inclusion of inactive users
async function readUsers(includeInactive: boolean = false): Promise<UserType[]> {
    return await readUserAction(includeInactive);
}

// Function to create a new user and return a JWT token
async function createUser(userData: CreateUserType): Promise<{ user: UserType; token: string }> {
    const { name, cedula, email, password } = userData;

    if (!name || !cedula || !email || !password) {
        throw new Error("All fields are required.");
    }

    if (!isValidEmail(email)) {
        throw new Error("Invalid email format.");
    }

    return await createUserAction(userData);
}

// Function to log in a user by validating credentials and generating a JWT token
async function loginUser(email: string, password: string): Promise<{ user: UserType; token: string } | null> {
    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    if (!isValidEmail(email)) {
        throw new Error("Invalid email format.");
    }

    return await findUserByCredentials(email, password);
}

// Function to update a user
async function updateUser(userId: string, updateData: UpdateUserType): Promise<UserType | null> {
    const userToBeUpdated = await UserModel.findById(userId);
    if (!userToBeUpdated || !userToBeUpdated.isActive) {
        throw new Error("User is already disabled and cannot be updated.");
    }
    return await updateUserAction(userId, updateData);
}

// Function to disable a user
async function deleteUser(userId: string): Promise<UserType | null> {
    const userToBeUpdated = await UserModel.findById(userId);
    if (!userToBeUpdated || !userToBeUpdated.isActive) {
        throw new Error("User is already disabled.");
    }
    return await deleteUserAction(userId);
}

// EXPORT CONTROLLER FUNCTIONS
export { readUsers, createUser, loginUser, updateUser, deleteUser };
