import { GetStaticProps } from "next";
import { NewsroomPage } from "@src/apps/newsroom/Newsroom";
import { newsApi } from "@src/apis/newsApi";
import { USE_NEWSROOM_QUERY_KEY } from "@src/queries/useNewsroomQuery";

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

export default NewsroomPage;
