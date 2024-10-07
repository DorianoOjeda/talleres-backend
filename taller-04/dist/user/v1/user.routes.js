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
            message: "Success",
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
                message: "Hobby is required",
            });
        }
        const users = yield (0, user_controller_1.getUsersByHobby)(hobby);
        if (users.length === 0) {
            return response.status(404).json({
                message: `No users found with the hobby: ${hobby}`,
            });
        }
        response.status(200).json({
            message: "Success",
            users: users,
        });
    });
}
// Get users by ID
function CheckUserExists(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(request.params.id, 10);
        const exists = yield (0, user_controller_1.userExists)(userId);
        response.status(200).json({
            message: "Success",
            exists: exists,
        });
    });
}
// Get total experience by team
function GetTotalExperienceByTeam(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { team } = request.query;
        if (!team) {
            return response.status(400).json({
                message: "Team is required",
            });
        }
        const totalExperience = yield (0, user_controller_1.totalExperienceByTeam)(team);
        response.status(200).json({
            message: "Success",
            totalExperience: totalExperience,
        });
    });
}
// Get users by faction
function GetUsersByFaction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { faction } = request.query;
        if (!faction) {
            return response.status(400).json({
                message: "Faction is required",
            });
        }
        const users = yield (0, user_controller_1.usersByFaction)(faction);
        if (users.length === 0) {
            return response.status(404).json({
                message: `No users found in the faction: ${faction}`,
            });
        }
        response.status(200).json({
            message: "Success",
            users: users,
        });
    });
}
// Create new user
function RegisterUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = request.body;
        if (!userData || !userData.id || !userData.name || !userData.hobbies || !userData.years || !userData.team || !userData.faction) {
            return response.status(400).json({
                message: "All fields are required",
            });
        }
        try {
            const newUser = yield (0, user_controller_1.createUser)(userData);
            response.status(201).json({
                message: "User created successfully",
                user: newUser,
            });
        }
        catch (error) {
            const err = error;
            response.status(500).json({
                message: "Error creating user",
                error: err.message,
            });
        }
    });
}
// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
//PUNTO 1
userRoutes.get("/hobby", GetUsersByHobby);
//PUNTO 2
userRoutes.get("/exists/:id", CheckUserExists);
//PUNTO 3
userRoutes.get("/team-experience", GetTotalExperienceByTeam);
//PUNTO 4
userRoutes.get("/by-faction", GetUsersByFaction);
//PUNTO 5
userRoutes.post("/", RegisterUser);
// EXPORT ROUTES
exports.default = userRoutes;
