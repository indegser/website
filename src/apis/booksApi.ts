import { notion } from "@src/sdks/notion";

const getBooks = () => {
  return notion.databases.query({
    database_id: "6dc0fa57a6a54cad9242f6feefc22344",
    sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
    filter: {
      or: [
        {
          property: "Status",
          select: {
            equals: "Reading",
          },
        },
      ],
    },
  });
};

const getBook = (bookId: string) => {
  return notion.pages.retrieve({ page_id: bookId });
};

export const booksApi = {
  getBooks,
  getBook,
};