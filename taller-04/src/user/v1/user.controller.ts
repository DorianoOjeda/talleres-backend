import { readUserAction, 
  readUsersByHobby, 
  checkUserExists, 
  getTotalExperienceByTeam, 
  getUsersByFaction } from "./read.user.action";

import { createUserAction } from "./create.user.action";
import { UserType } from "./user.model";

// DECLARE CONTROLLER FUNCTIONS TO READ ALL USERS
async function readUsers(): Promise<UserType[]> {
  const users = await readUserAction();
  return users;
}

// CONTROLLER FUNCTION TO READ USERS BY HOBBY
async function getUsersByHobby(hobby: string): Promise<UserType[]> {
  const users = await readUsersByHobby(hobby);
  return users;
}

// CONTROLLER FUNCTION TO CHECK IF USER EXISTS
async function userExists(userId: number): Promise<boolean> {
  return await checkUserExists(userId);
}

// CONTROLLER FUNTION TO GET TOTAL EXPERIENCE BY TEAM
async function totalExperienceByTeam(team: string): Promise<number> {
  return await getTotalExperienceByTeam(team);
}

// CONTROLLER FUNCTION TO GET USERS BY FACTION
async function usersByFaction(faction: string): Promise<UserType[]> {
  return await getUsersByFaction(faction);
}

// CONTROLLER FUNCTION TO CREATE A USER
async function createUser(userData: UserType): Promise<UserType> {
  return await createUserAction(userData);
}

// EXPORT CONTROLLER FUNCTIONS
export { readUsers, 
  getUsersByHobby, 
  userExists, 
  totalExperienceByTeam,
  usersByFaction,
  createUser };
