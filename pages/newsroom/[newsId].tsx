import { GetStaticPaths, GetStaticProps } from "next";

import { newsApi } from "@src/apis/newsApi";
import { News } from "@src/pages/news/News";
import { NewsPageType } from "@src/types/news.types";
import { getNotionContent } from "@src/utils/notion";
import { getMetaFromNotionPage } from "@src/utils/notion/meta";

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await newsApi.getNewsDatabase();

  const paths = results.map((result) => ({
    params: { newsId: result.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const newsId = params.newsId.toString();

  const page = (await newsApi.getNews(newsId)) as NewsPageType;
  const blocks = await getNotionContent(newsId);
  const meta = getMetaFromNotionPage(page, blocks);

  return {
    props: { meta, blocks },
    revalidate: 10,
  };
};

export default News;
