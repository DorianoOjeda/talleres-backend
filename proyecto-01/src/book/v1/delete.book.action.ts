import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function deleteBookAction(bookId: string): Promise<BookType | null> {
    // Find the book by ID and mark it as unavailable
    const deletedBook = await BookModel.findByIdAndUpdate(
        bookId,
        { isAvailable: false },
        { new: true }
    );

    return deletedBook;
}

// EXPORT ACTION FUNCTION
export default deleteBookAction;
