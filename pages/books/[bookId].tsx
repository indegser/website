import { GetStaticPaths, GetStaticProps } from "next";

import { booksApi } from "@src/apis/booksApi";
import { BookPage } from "@src/pages/books/BookPage";
import { getNotionContent } from "@src/utils/notion";

export const getStaticPaths: GetStaticPaths = async () => {
  const database = await booksApi.getBooks();
  const paths = database.results.map((book) => ({
    params: { bookId: book.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bookId = params.bookId.toString();

  const page = await booksApi.getBook(bookId);
  const blocks = await getNotionContent(bookId);

  return {
    props: { page, blocks },
    revalidate: 10,
  };
};

export default BookPage;
