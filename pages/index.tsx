import { GetServerSideProps } from "next";

import { newsApi } from "@src/apis/newsApi";
import { Newsroom } from "@src/pages/newsroom/Newsroom";

export const getServerSideProps: GetServerSideProps = async () => {
  const database = await newsApi.getNewsDatabase();

  return {
    props: {
      database,
    },
  };
};

export default Newsroom;
