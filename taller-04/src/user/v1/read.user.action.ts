import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION TO READ ALL USERS
async function readUserAction(): Promise<UserType[]> {
  const results = await UserModel.find();
  return results;
}

// DECLARE ACTION FUNCTION TO READ USERS BY HOBBY
async function readUsersByHobby(hobby: string): Promise<UserType[]> {
  const results = await UserModel.find({ hobbies: hobby });
  return results;
}

// DECLARE ACTION FUNCTION TO CHECK IF USER EXISTS BY ID
async function checkUserExists(userId: number): Promise<boolean> {
  const user = await UserModel.findOne({ id: userId });
  return user !== null;
}

// DECLARE ACTION FUNCTION TO GET TOTAL EXPREICNE BY TEAM
async function getTotalExperienceByTeam(team: string): Promise<number> {
  const users = await UserModel.find({ team });
  const totalExperience = users.reduce((sum, user) => sum + user.years, 0);
  return totalExperience;
}

// DECLARE ACTION FUNCTION TO GET USERS BY FACTION
async function getUsersByFaction(faction: string): Promise<UserType[]> {
  const results = await UserModel.find({ faction });
  return results;
}

// EXPORT ACTION FUNCTIONS
export { 
  readUserAction, 
  readUsersByHobby, 
  checkUserExists, 
  getTotalExperienceByTeam,
  getUsersByFaction };
