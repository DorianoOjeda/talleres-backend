"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUsers = readUsers;
exports.getUsersByHobby = getUsersByHobby;
exports.userExists = userExists;
exports.totalExperienceByTeam = totalExperienceByTeam;
exports.usersByFaction = usersByFaction;
exports.createUser = createUser;
const read_user_action_1 = require("./read.user.action");
const create_user_action_1 = require("./create.user.action");
// DECLARE CONTROLLER FUNCTIONS TO READ ALL USERS
function readUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, read_user_action_1.readUserAction)();
        return users;
    });
}
// CONTROLLER FUNCTION TO READ USERS BY HOBBY
function getUsersByHobby(hobby) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, read_user_action_1.readUsersByHobby)(hobby);
        return users;
    });
}
// CONTROLLER FUNCTION TO CHECK IF USER EXISTS
function userExists(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, read_user_action_1.checkUserExists)(userId);
    });
}
// CONTROLLER FUNTION TO GET TOTAL EXPERIENCE BY TEAM
function totalExperienceByTeam(team) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, read_user_action_1.getTotalExperienceByTeam)(team);
    });
}
// CONTROLLER FUNCTION TO GET USERS BY FACTION
function usersByFaction(faction) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, read_user_action_1.getUsersByFaction)(faction);
    });
}
// CONTROLLER FUNCTION TO CREATE A USER
function createUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, create_user_action_1.createUserAction)(userData);
    });
}
