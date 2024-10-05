import { readUserAction, readUsersByHobby } from "./read.user.action";
import { UserType } from "./user.model";

// DECLARE CONTROLLER FUNCTIONS
async function readUsers(): Promise<UserType[]> {
  const users = await readUserAction();

  return users;
}
// CONTROLLER FUNCTION TO READ USERS BY HOBBY
async function getUsersByHobby(hobby: string): Promise<UserType[]> {
  const users = await readUsersByHobby(hobby);
  return users;
}

// EXPORT CONTROLLER FUNCTIONS
export { readUsers, getUsersByHobby };
