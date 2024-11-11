import createReservationAction from "./create.reservation.action";
import { reservationsByBook, reservationsByUser } from "./read.reservation.action";
import { CreateReservationType, PopulatedReservationType } from "./reservation.types";


async function createReservation(data: CreateReservationType): Promise<PopulatedReservationType | null> {
    return await createReservationAction(data);
}


async function getBookReservations(bookId: string): Promise<PopulatedReservationType[]> {
    return await reservationsByBook(bookId);
}


async function getUserReservations(userId: string): Promise<PopulatedReservationType[]> {
    return await reservationsByUser(userId);
}

export { createReservation, getBookReservations, getUserReservations };
