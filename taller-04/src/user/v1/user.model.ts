import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
interface UserType {
    id: number;
    name: string;
    hobbies: string[];
    years: number;
    team: string;
    faction: string;
}

// DECLARE MONGOOSE SCHEMA
const UserSchema = new Schema<UserType>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    hobbies: { type: [String], required: true },
    years: { type: Number, required: true },
    team: { type: String, required: true },
    faction: { type: String, required: true }
});

// DECLARE MONGO MODEL
const UserModel = model<UserType>("User", UserSchema);

// EXPORT ALL
export { UserModel, UserSchema, UserType };
