import { Block } from "./Block";
import { useNewsHashRouter, useNewsSeo } from "./News.hooks";
import { NewsHeadline } from "./NewsHeadline";

import { PageContainer } from "@src/common/atoms/Container";
import { SEO } from "@src/common/SEO";
import { styled, theme } from "@src/common/stitches.config";
import { mq } from "@src/common/theme";
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
      <Article>
        {blocks.map((block, index) => {
          if (!("type" in block)) {
            return null;
          }

          return (
            <Block key={block.id} block={block} index={index} blocks={blocks} />
          );
        })}
      </Article>
    </PageContainer>
  );
};

const Article = styled("article", {
  fontSize: 16,
  lineHeight: "26px",
  letterSpacing: "-0.018em",
  paddingBottom: 80,
  fontWeight: 420,
  color: theme.colors.gray12,

  [mq("sm")]: {
    fontSize: 18,
    padding: "0 0 80px 0",
  },
});
