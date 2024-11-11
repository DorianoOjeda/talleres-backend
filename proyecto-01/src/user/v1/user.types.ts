import { UserType } from "./user.model";

export type CreateUserType = Omit<UserType, "_id">
export type UpdateUserType = Omit<Partial<UserType>, "_id">
export type UserReferenceType = Pick<UserType, "_id" | "name">;

declare global {
    namespace Express {
        interface Request {
            user?: UserType;
        }
    }
}

export {};
