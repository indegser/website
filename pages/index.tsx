import { GetStaticProps } from "next";

import { newsApi } from "@src/apis/newsApi";
import { seriesApi } from "@src/apis/seriesApi";
import { Newsroom } from "@src/pages/newsroom/Newsroom";

export const getStaticProps: GetStaticProps = async () => {
  const database = await newsApi.getNewsDatabase();
  const series = await seriesApi.getSeriesList();

  return {
    props: {
      database,
      store: {
        series,
      },
    },
    revalidate: 10,
  };
};

export default Newsroom;
