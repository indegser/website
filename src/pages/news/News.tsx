import { useNewsHashRouter } from "./News.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { NotionContent } from "@src/design/notion/NotionContent";
import { ContentHeadline } from "@src/design/organs/content/ContentHeadline";
import { usePageTracking } from "@src/hooks/usePageTracking";
import { ContentMetaType } from "@src/types/content.types";
import { BlockType } from "@src/types/notion.types";

interface Props {
  meta: ContentMetaType;
  blocks: BlockType[];
}

export const News = ({ meta, blocks }: Props) => {
  // const { title, excerpt, imageUrl } = useNewsSeo(page, blocks);
  useNewsHashRouter();
  usePageTracking("visit_news", { id: meta.id, title: meta.title });

  return (
    <PageContainer>
      <SEO {...meta} />
      <ContentHeadline {...meta} />
      <NotionContent blocks={blocks} />
    </PageContainer>
  );
};
