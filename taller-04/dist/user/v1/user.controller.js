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
const read_user_action_1 = require("./read.user.action");
// DECLARE CONTROLLER FUNCTIONS
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
