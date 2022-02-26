import { GetStaticProps } from "next";
import { MainPage } from "apps/main/MainPage";
import { newsApi } from "apis/newsApi";
import { USE_NEWSROOM_QUERY_KEY } from "queries/useNewsroomQuery";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const news = await newsApi.getAllNews();
    return {
      props: {
        fallback: {
          [USE_NEWSROOM_QUERY_KEY]: news,
        },
      },
      revalidate: 60,
    }; // 1min.
  } catch (err) {
    return { props: {} };
  }
};

export default MainPage;
