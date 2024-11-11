import { BookModel, BookType } from "./book.model";
import { UpdateBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function updateBookAction(bookId: string, updateData: UpdateBookType): Promise<BookType | null> {
    // Find and update the book by ID, returning the updated document
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, updateData, { new: true });
    return updatedBook;
}

// EXPORT ACTION FUNCTION
export default updateBookAction;
