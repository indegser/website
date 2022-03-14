import { Block } from "./Block";
import { NewsHeadline } from "./NewsHeadline";

import { PageContainer } from "@src/common/atoms/Container";
import { styled, theme } from "@src/common/stitches.config";
import { mq } from "@src/common/theme";
import {
  BlockChildrenType,
  BlockType,
  NewsType,
} from "@src/types/notion.types";

interface Props {
  news: BlockChildrenType;
  page: NewsType;
}

export const News = ({ news, page }: Props) => {
  return (
    <PageContainer>
      <NewsHeadline news={page} />
      <Content>
        {news.results.map((block, index) => {
          if (!("type" in block)) {
            return null;
          }

          return (
            <Block
              key={block.id}
              block={block}
              index={index}
              blocks={news.results as BlockType[]}
            />
          );
        })}
      </Content>
    </PageContainer>
  );
};

const Content = styled("article", {
  fontSize: 17,
  lineHeight: "28px",
  letterSpacing: "-0.014em",
  paddingBottom: 80,
  fontWeight: 400,
  color: theme.colors.gray12,

  [mq("sm")]: {
    fontSize: 18,
    padding: "0 0 80px 0",
  },
});
