import { Types } from "mongoose";
import { BookReferenceType } from "../../book/v1/book.types";
import { UserReferenceType } from "../../user/v1/user.types";
import { ReservationType } from "./reservation.model";

export type CreateReservationType = {
    book: Types.ObjectId;
    user: Types.ObjectId;
    reservationDate: Date;
    returnDate: Date;
};

export type PopulatedReservationType = Omit<ReservationType, "book" | "user"> & {
    book: BookReferenceType;
    user: UserReferenceType;
};

