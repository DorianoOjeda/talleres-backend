import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION
async function readUserAction(): Promise<UserType[]> {
  const results = await UserModel.find();

  return results;
}

async function readUsersByHobby(hobby: string): Promise<UserType[]> {
  const results = await UserModel.find({ hobbies: hobby });
  return results;
}

// EXPORT ACTION FUNCTION
export { readUserAction, readUsersByHobby };
