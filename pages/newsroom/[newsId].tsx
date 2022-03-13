import { GetStaticPaths, GetStaticProps } from "next";

import { News } from "@src/pages/news/News";
import { notion } from "@src/sdks/notion";

export const getStaticPaths: GetStaticPaths = async () => {
  const news = await notion.databases.query({
    database_id: "0021f4b0494546a596716a7a5d9db452",
    page_size: 20,
  });

  const paths = news.results.map((result) => ({
    params: { newsId: result.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const newsId = params.newsId.toString();

  try {
    const news = await notion.blocks.children.list({
      block_id: newsId,
      page_size: 100,
    });

    const page = await notion.pages.retrieve({
      page_id: newsId,
    });

    return { props: { news, page }, revalidate: 60 };
  } catch (err) {
    return { notFound: true };
  }
};

export default News;
