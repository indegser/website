import { Block } from "./Block";

import { PageContainer } from "@src/common/atoms/Container";
import { styled } from "@src/common/stitches.config";
import { mq } from "@src/common/theme";
import { BlockChildrenType } from "@src/types/notion.types";

interface Props {
  news: BlockChildrenType;
}

export const News = ({ news }: Props) => {
  return (
    <PageContainer>
      <Content>
        {news.results.map((block) => {
          if (!("type" in block)) {
            return null;
          }
          return <Block key={block.id} block={block} />;
        })}
      </Content>
    </PageContainer>
  );
};

const Content = styled("article", {
  fontSize: 16,
  lineHeight: "25px",
  letterSpacing: "-0.014em",
  paddingBottom: 80,
  fontWeight: 400,

  [mq("sm")]: {
    fontSize: 17,
    lineHeight: 1.5,
    padding: "0 0 80px 0",
  },
});
