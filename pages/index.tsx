import { GetStaticProps } from "next";

import { newsApi } from "@src/apis/newsApi";
import { seriesApi } from "@src/apis/seriesApi";
import { Newsroom } from "@src/pages/newsroom/Newsroom";

export const getStaticProps: GetStaticProps = async () => {
  const initialData = await newsApi.getNewsDatabase();
  const series = await seriesApi.getSeriesList();

  return {
    props: {
      initialData,
      store: {
        series,
      },
    },
    revalidate: 10,
  };
};

export default Newsroom;
