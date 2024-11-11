import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type UserType = {
    _id: string;
    name: string;
    cedula: string;
    email: string;
    password: string;
    permissions: {
        canCreateBooks: boolean;
        canModifyUsers: boolean;
        canModifyBooks: boolean;
        canDisableUsers: boolean;
        canDisableBooks: boolean;
    };
    isActive: boolean;
};

// DECLARE MONGOOSE SCHEMA
const UserSchema = new Schema<UserType>({
    name: { type: String, required: true },
    cedula: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permissions: {
        canCreateBooks: { type: Boolean, default: false },
        canModifyUsers: { type: Boolean, default: false },
        canModifyBooks: { type: Boolean, default: false },
        canDisableUsers: { type: Boolean, default: false },
        canDisableBooks: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false,
});

// DECLARE MONGO MODEL
const UserModel = model<UserType>("User", UserSchema);

// EXPORT ALL
export { UserModel, UserSchema, UserType };
