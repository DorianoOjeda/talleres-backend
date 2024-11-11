import { BookType } from "./book.model";

export type CreateBookType = Omit<BookType, "_id" | "isAvailable">;

export type UpdateBookType = Partial<Omit<BookType, "_id" | "isAvailable">>;

export type BookReferenceType = Pick<BookType, "_id" | "name">;
