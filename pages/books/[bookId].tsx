import { GetStaticPaths, GetStaticProps } from "next";

import { booksApi } from "@src/apis/booksApi";
import { BookPage } from "@src/pages/books/BookPage";
import { BookType } from "@src/types/book.types";
import { getNotionContent } from "@src/utils/notion";
import { getMetaFromNotionPage } from "@src/utils/notion/meta";

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

  const page = (await booksApi.getBook(bookId)) as BookType;
  const blocks = await getNotionContent(bookId);
  const meta = getMetaFromNotionPage(page, blocks);

  return {
    props: { meta, blocks },
    revalidate: 10,
  };
};

export default BookPage;
