import { Router, Request, Response } from "express";
import { createBook, readBooks, updateBook, deleteBook } from "./book.controller";
import { AuthMiddleware } from "../../middleware/auth";
import { canCreateBooks } from "../../middleware/canCreateBooks";
import { canModifyBooks } from "../../middleware/canModifyBooks";
import { canDeleteBooks } from "../../middleware/canDeleteBooks";

// INIT ROUTES
const bookRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function CreateBook(request: Request, response: Response) {
    try {
        const bookData = request.body;
        const createdBook = await createBook(bookData);
        response.status(201).json({
            message: "Book created successfully",
            book: createdBook,
        });
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }
}


async function GetBooks(request: Request, response: Response) {
    const bookId = request.query.id as string | null;
    const includeUnavailable = request.query.includeUnavailable === "true";

    // Optional filters
    const filters = {
        genre: request.query.genre as string,
        publicationDate: request.query.publicationDate ? new Date(request.query.publicationDate as string) : undefined,
        publishingHouse: request.query.publishingHouse as string,
        author: request.query.author as string,
        name: request.query.name as string,
    };

    try {
        const result = await readBooks(bookId, filters, includeUnavailable);
        if (bookId && !result) {
            return response.status(404).json({ message: "Book not found." });
        }
        response.status(200).json({
            message: "Books successfully obtained",
            books: result,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error getting books.",
            error: (error as Error).message,
        });
    }
}


async function UpdateBook(request: Request, response: Response) {
    try {
        const bookId = request.params.id;
        const updateData = request.body;
        const updatedBook = await updateBook(bookId, updateData);

        if (!updatedBook) {
            return response.status(404).json({ message: "Book not found." });
        }

        response.status(200).json({
            message: "Book updated successfully",
            book: updatedBook,
        });
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }
}


async function DeleteBook(request: Request, response: Response) {
    try {
        const bookId = request.params.id;
        const deletedBook = await deleteBook(bookId);

        if (!deletedBook) {
            return response.status(404).json({ message: "Book not found or already deleted." });
        }

        response.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook,
        });
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }
}

// DECLARE ENDPOINTS
bookRoutes.get("/", GetBooks);
bookRoutes.post("/", AuthMiddleware, canCreateBooks, CreateBook);
bookRoutes.put("/:id", AuthMiddleware, canModifyBooks, UpdateBook);
bookRoutes.delete("/:id", AuthMiddleware, canDeleteBooks, DeleteBook);

// EXPORT ROUTES
export default bookRoutes;
