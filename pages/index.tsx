import { GetServerSideProps } from "next";

import { newsApi } from "@src/apis/newsApi";
import { Newsroom } from "@src/pages/newsroom/Newsroom";

export const getServerSideProps: GetServerSideProps = async () => {
  const database = await newsApi.getNewsDatabase();
  const newsroom = await newsApi.retrieveNewsroom();

  return {
    props: {
      newsroom,
      database,
    },
  };
};

export default Newsroom;
