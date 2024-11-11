import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION
async function updateUserAction(userId: string, updateData: Partial<UserType>): Promise<UserType | null> {
    return await UserModel.findByIdAndUpdate(userId,  updateData, { new: true });
}

// EXPORT ACTION FUNCTION
export { updateUserAction };
