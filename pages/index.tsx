import { GetStaticProps } from "next";

import { booksApi } from "@src/apis/booksApi";
import { newsApi } from "@src/apis/newsApi";
import { Newsroom } from "@src/pages/newsroom/Newsroom";

export const getStaticProps: GetStaticProps = async () => {
  const database = await newsApi.getNewsDatabase();
  const books = await booksApi.getBooks();

  return {
    props: {
      database,
      books,
    },
    revalidate: 10,
  };
};

export default Newsroom;
