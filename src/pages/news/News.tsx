import { useNewsHashRouter } from "./News.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { NotionContent } from "@src/design/notion/NotionContent";
import { BlockType } from "@src/types/notion";

interface Props {
  blocks: BlockType[];
}

export const News = ({ blocks }: Props) => {
  useNewsHashRouter();

  // usePageTracking("visit_news", meta);

  return (
    <PageContainer>
      <NotionContent blocks={blocks} />
    </PageContainer>
  );
};
