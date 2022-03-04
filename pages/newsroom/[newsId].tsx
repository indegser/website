import { GetStaticPaths, GetStaticProps } from "next";
import { NewsPage } from "apps/news/NewsPage";
import { newsApi } from "apis/newsApi";
import { buildUseNewsQueryKey } from "queries/useNewsQuery";

export const getStaticPaths: GetStaticPaths = async () => {
  const news = await newsApi.getLatestNews();

  const paths = news.map((item) => ({
    params: { newsId: item.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const newsId = params.newsId.toString();

  try {
    const news = await newsApi.getNews(newsId);
    return { props: { fallback: { [buildUseNewsQueryKey(newsId)]: news } } };
  } catch (err) {
    return { notFound: true };
  }
};

export default NewsPage;
