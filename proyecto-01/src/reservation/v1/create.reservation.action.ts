import { ReservationModel, ReservationType } from "./reservation.model";
import { CreateReservationType } from "./reservation.types";
import { Types } from "mongoose";


async function createReservationAction(data: CreateReservationType): Promise<ReservationType> {
    const reservationData = {
        ...data,
        book: new Types.ObjectId(data.book), 
        user: new Types.ObjectId(data.user),
    };

    return await ReservationModel.create(reservationData);
}

export default createReservationAction;
