import { BookModel, BookType } from "./book.model";
import { CreateBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function createBookAction(bookData: CreateBookType): Promise<BookType> {
    const newBook = await BookModel.create(bookData);
    return newBook;
}

// EXPORT ACTION FUNCTION
export default createBookAction;
