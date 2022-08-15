import { GetStaticProps } from "next";

import { newsApi } from "@src/apis/newsApi";
import { Newsroom } from "@src/pages/newsroom/Newsroom";

export const getStaticProps: GetStaticProps = async () => {
  const database = await newsApi.getNewsDatabase();

  return {
    props: {
      database,
    },
    revalidate: 10,
  };
};

export default Newsroom;
