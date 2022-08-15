import { useNewsHashRouter } from "./News.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { NotionContent } from "@src/design/notion/NotionContent";
import { ContentHeadline } from "@src/design/organs/content/ContentHeadline";
import { ContentMetaType } from "@src/types/content.types";
import { BlockType } from "@src/types/notion.types";
import { usePageTracking } from "@src/utils/analytics/usePageTracking";

interface Props {
  meta: ContentMetaType;
  blocks: BlockType[];
}

export const News = ({ meta, blocks }: Props) => {
  useNewsHashRouter();

  usePageTracking("visit_news", meta);

  return (
    <PageContainer>
      <SEO {...meta} />
      <ContentHeadline {...meta} />
      <NotionContent blocks={blocks} />
    </PageContainer>
  );
};
