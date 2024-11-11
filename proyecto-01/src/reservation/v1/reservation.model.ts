import { Schema, model, Types, Document } from "mongoose";
import { BookReferenceType } from "../../book/v1/book.types";
import { UserReferenceType } from "../../user/v1/user.types";


interface ReservationType extends Document {
    book: BookReferenceType; 
    user: UserReferenceType;
    reservationDate: Date;
    returnDate: Date;
    createdAt: Date;
    updatedAt: Date;
}


const ReservationSchema = new Schema<ReservationType>(
    {
        book: {
            type: Types.ObjectId,
            ref: "Book",
            required: true
        },
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true
        },
        reservationDate: {
            type: Date,
            required: true
        },
        returnDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);


const ReservationModel = model<ReservationType>("Reservation", ReservationSchema);

export { ReservationModel, ReservationType };
