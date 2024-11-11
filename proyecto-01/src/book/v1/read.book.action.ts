import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function findBookById(bookId: string, includeUnavailable: boolean = false): Promise<BookType | null> {
    // Trim the bookId of any spaces or newline characters
    bookId = bookId.trim();
    // If includeUnavailable is false, add a filter for available books only
    const query = includeUnavailable ? { _id: bookId } : { _id: bookId, isAvailable: true };
    return await BookModel.findOne(query);
}

async function findBooksByFilters(filters: Partial<BookType>, includeUnavailable: boolean = false): Promise<BookType[]> {
    const query: any = includeUnavailable ? {} : { isAvailable: true }; 

    // Apply filters to the query
    if (filters.genre) query.genre = { $regex: filters.genre, $options: "i" };
    if (filters.publishingHouse) query.publishingHouse = { $regex: filters.publishingHouse, $options: "i" };
    if (filters.author) query.author = { $regex: filters.author, $options: "i" };
    if (filters.name) query.name = { $regex: filters.name, $options: "i" };

    // Filter by publication date if provided
    if (filters.publicationDate) {
        const startOfDay = new Date(filters.publicationDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(filters.publicationDate);
        endOfDay.setHours(23, 59, 59, 999);
        query.publicationDate = { $gte: startOfDay, $lte: endOfDay };
    }

    return await BookModel.find(query);
}

// EXPORT ACTION FUNCTION
export { findBookById, findBooksByFilters };
