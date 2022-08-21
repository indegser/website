import { styled } from "@stitches/react";

import { mq } from "../theme/mediaQueries";
import { theme } from "../theme/stitches.config";
import { Block } from "./blocks/Block";

import { BlockType } from "@src/types/notion.types";

interface Props {
  blocks: BlockType[];
}

export const NotionContent = ({ blocks }: Props) => {
  return (
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
  );
};

const Article = styled("article", {
  fontSize: 16,
  lineHeight: "26px",
  letterSpacing: "-0.018em",
  paddingBottom: 80,
  fontWeight: 400,
  color: theme.colors.gray12,

  [mq("sm")]: {
    fontSize: 18,
    padding: "0 0 80px 0",
  },
});
