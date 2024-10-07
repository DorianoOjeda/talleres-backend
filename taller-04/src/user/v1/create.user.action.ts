import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION TO CREATE A USER
async function createUserAction(userData: UserType): Promise<UserType> {
    const newUser = new UserModel(userData);
    await newUser.save();
    return newUser;
  }

// EXPORT ACTION FUNCTION
export { createUserAction };
