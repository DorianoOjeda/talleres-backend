import createBookAction from "./create.book.action";
import { findBookById, findBooksByFilters } from "./read.book.action";
import updateBookAction from "./update.book.action";
import deleteBookAction from "./delete.book.action";
import { BookModel, BookType } from "./book.model";
import { CreateBookType, UpdateBookType } from "./book.types";
import mongoose from "mongoose";


async function createBook(bookData: CreateBookType): Promise<BookType> {
    const { name, author, genre, publishingHouse, publicationDate } = bookData;

    if (!name || !author || !genre || !publishingHouse || !publicationDate) {
        throw new Error("All fields (name, author, genre, publishingHouse, publicationDate) are required.");
    }

    return await createBookAction(bookData);
}

// optional inclusion of unavailable books
async function readBooks(bookId: string | null, filters: Partial<BookType>, includeUnavailable: boolean = false): Promise<BookType | BookType[] | null> {
    // Validate bookId format if provided
    if (bookId && !mongoose.Types.ObjectId.isValid(bookId)) {
        throw new Error("Invalid book ID format.");
    }

    if (bookId) {
        return await findBookById(bookId, includeUnavailable);
    } else {
        return await findBooksByFilters(filters, includeUnavailable);
    }
}

async function updateBook(bookId: string, updateData: UpdateBookType): Promise<BookType | null> {
    // Check if the book ID is valid
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        throw new Error("Invalid book ID format.");
    }

    // Check if the book exists and is available
    const bookToBeUpdated = await BookModel.findById(bookId);
    if (!bookToBeUpdated || !bookToBeUpdated.isAvailable) {
        throw new Error("The book is unavailable or does not exist.");
    }

    return await updateBookAction(bookId, updateData);
}

async function deleteBook(bookId: string): Promise<BookType | null> {
    // Validate book ID format
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        throw new Error("Invalid book ID format.");
    }

    // Check if the book exists and is available
    const bookToBeDeleted = await BookModel.findById(bookId);
    if (!bookToBeDeleted || !bookToBeDeleted.isAvailable) {
        throw new Error("The book is already unavailable or does not exist.");
    }

    return await deleteBookAction(bookId);
}

// EXPORT CONTROLLER FUNCTIONS
export { createBook, readBooks, updateBook, deleteBook };
