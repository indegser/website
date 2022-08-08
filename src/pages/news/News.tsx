import { useNewsHashRouter, useNewsSeo } from "./News.hooks";
import { NewsHeadline } from "./NewsHeadline";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { NotionContent } from "@src/design/notion/NotionContent";
import { usePageTracking } from "@src/hooks/usePageTracking";
import {
  BlockChildrenType,
  BlockType,
  NewsType,
} from "@src/types/notion.types";

interface Props {
  news: BlockChildrenType;
  page: NewsType;
  blocks: BlockType[];
}

export const News = ({ page, blocks }: Props) => {
  const { title, excerpt, imageUrl } = useNewsSeo(page, blocks);
  useNewsHashRouter();
  usePageTracking("visit_news", { id: page.id, title });

  return (
    <PageContainer>
      <SEO title={title} description={excerpt} image={imageUrl} />
      <NewsHeadline news={page} />
      <NotionContent blocks={blocks} />
    </PageContainer>
  );
};
