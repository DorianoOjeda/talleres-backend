import { ReservationModel, ReservationType } from "./reservation.model";
import { PopulatedReservationType } from "./reservation.types";


async function reservationsByBook(bookId: string): Promise<PopulatedReservationType[]> {
    return await ReservationModel.find({ book: bookId })
        .populate("book", "name")
        .populate("user", "name"); 
}


async function reservationsByUser(userId: string): Promise<PopulatedReservationType[]> {
    return await ReservationModel.find({ user: userId })
        .populate("book", "name") 
        .populate("user", "name"); 
}

export { reservationsByBook, reservationsByUser };
