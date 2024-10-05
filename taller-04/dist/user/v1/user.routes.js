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
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
// INIT ROUTES
const userRoutes = (0, express_1.Router)();
// DECLARE ENDPOINT FUNCTIONS
function GetUsers(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, user_controller_1.readUsers)();
        response.status(200).json({
            message: "Success.",
            users: users,
        });
    });
}
// Get users by hobby
function GetUsersByHobby(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hobby } = request.query;
        if (!hobby) {
            return response.status(400).json({
                message: "Hobby is required.",
            });
        }
        const users = yield (0, user_controller_1.getUsersByHobby)(hobby);
        if (users.length === 0) {
            return response.status(404).json({
                message: `No users found with the hobby: ${hobby}`,
            });
        }
        response.status(200).json({
            message: "Success.",
            users: users,
        });
    });
}
// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.get("/hobby", GetUsersByHobby);
// EXPORT ROUTES
exports.default = userRoutes;
