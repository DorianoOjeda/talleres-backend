"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// DECLARE MONGOOSE SCHEMA
const UserSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    hobbies: { type: [String], required: true },
    years: { type: Number, required: true },
    team: { type: String, required: true },
    faction: { type: String, required: true }
});
exports.UserSchema = UserSchema;
// DECLARE MONGO MODEL
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.UserModel = UserModel;
