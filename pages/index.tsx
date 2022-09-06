import { GetStaticProps } from "next";

import { seriesApi } from "@src/apis/seriesApi";
import { Newsroom } from "@src/pages/newsroom/Newsroom";

export const getStaticProps: GetStaticProps = async () => {
  const series = await seriesApi.getSeriesList();

  return {
    props: {
      store: {
        series,
      },
    },
    revalidate: 10,
  };
};

export default Newsroom;
