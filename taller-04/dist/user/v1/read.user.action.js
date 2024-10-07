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
exports.readUserAction = readUserAction;
exports.readUsersByHobby = readUsersByHobby;
exports.checkUserExists = checkUserExists;
exports.getTotalExperienceByTeam = getTotalExperienceByTeam;
exports.getUsersByFaction = getUsersByFaction;
const user_model_1 = require("./user.model");
// DECLARE ACTION FUNCTION TO READ ALL USERS
function readUserAction() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield user_model_1.UserModel.find();
        return results;
    });
}
// DECLARE ACTION FUNCTION TO READ USERS BY HOBBY
function readUsersByHobby(hobby) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield user_model_1.UserModel.find({ hobbies: hobby });
        return results;
    });
}
// DECLARE ACTION FUNCTION TO CHECK IF USER EXISTS BY ID
function checkUserExists(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.UserModel.findOne({ id: userId });
        return user !== null;
    });
}
// DECLARE ACTION FUNCTION TO GET TOTAL EXPREICNE BY TEAM
function getTotalExperienceByTeam(team) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield user_model_1.UserModel.find({ team });
        const totalExperience = users.reduce((sum, user) => sum + user.years, 0);
        return totalExperience;
    });
}
// DECLARE ACTION FUNCTION TO GET USERS BY FACTION
function getUsersByFaction(faction) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield user_model_1.UserModel.find({ faction });
        return results;
    });
}
