import { GetStaticPaths, GetStaticProps } from "next";

import { News } from "@src/pages/news/News";
import { notion } from "@src/sdks/notion";
import { isProduction } from "@src/types/env.types";
import { BlockType } from "@src/types/notion.types";

export const getStaticPaths: GetStaticPaths = async () => {
  const news = await notion.databases.query({
    database_id: "0021f4b0494546a596716a7a5d9db452",
    page_size: 20,
    filter: isProduction
      ? {
          property: "status",
          select: {
            equals: "Production",
          },
        }
      : { property: "status", select: { is_not_empty: true } },
  });

  const paths = news.results.map((result) => ({
    params: { newsId: result.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

const getBlocksWithChildren = async (blocks: BlockType[]) => {
  return await Promise.all(
    blocks.map(async (block) => {
      return await getBlockWithChildren(block);
    })
  );
};
const getBlockWithChildren = async (block: BlockType) => {
  if (block.has_children === true) {
    const result = await notion.blocks.children.list({
      block_id: block.id,
      page_size: 100,
    });

    /**
     * @todo has_more 체크
     */

    block["children"] = await getBlocksWithChildren(
      result.results as BlockType[]
    );
  }

  return block;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const newsId = params.newsId.toString();

  try {
    const news = await notion.blocks.children.list({
      block_id: newsId,
      page_size: 100,
    });

    const blocks = await getBlocksWithChildren(news.results as BlockType[]);

    const page = await notion.pages.retrieve({
      page_id: newsId,
    });

    return { props: { blocks, page }, revalidate: 60 };
  } catch (err) {
    return { notFound: true };
  }
};

export default News;
