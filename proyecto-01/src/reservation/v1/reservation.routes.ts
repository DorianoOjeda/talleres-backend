import { Router, Request, Response } from "express";
import { createReservation, getBookReservations, getUserReservations } from "./reservation.controller";
import { AuthMiddleware } from "../../middleware/auth";

const reservationRoutes = Router();

async function CreateReservation(request: Request, response: Response) {
    const { book, user, reservationDate, returnDate } = request.body;

    if (!book || !user || !reservationDate || !returnDate) {
        return response.status(400).json({ message: "All fields are required." });
    }

    try {
        const newReservation = await createReservation({
            book,
            user,
            reservationDate,
            returnDate
        });
        response.status(201).json({
            message: "Reservation created successfully.",
            reservation: newReservation,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error creating reservation.",
            error: (error as Error).message,
        });
    }
}

async function BookReservations(request: Request, response: Response) {
    const bookId = request.params.bookId;

    try {
        const reservations = await getBookReservations(bookId);
        response.status(200).json({
            message: "Book reservations retrieved successfully.",
            reservations: reservations,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error retrieving book reservations.",
            error: (error as Error).message,
        });
    }
}

async function UserReservations(request: Request, response: Response) {
    const userId = request.params.userId;

    try {
        const reservations = await getUserReservations(userId);
        response.status(200).json({
            message: "User reservations retrieved successfully.",
            reservations: reservations,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error retrieving user reservations.",
            error: (error as Error).message,
        });
    }
}

reservationRoutes.post("/", AuthMiddleware, CreateReservation);
reservationRoutes.get("/books/:bookId", AuthMiddleware, BookReservations);
reservationRoutes.get("/users/:userId", AuthMiddleware, UserReservations);

export default reservationRoutes;
