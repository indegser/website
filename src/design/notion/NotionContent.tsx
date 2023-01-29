import { styled } from "@stitches/react";

import { Block } from "./blocks/Block";
import { mq } from "../theme/mediaQueries";
import { theme } from "../theme/stitches.config";

import { BlockType } from "@src/types/notion";

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
  letterSpacing: "-0.008em",
  fontWeight: 450,
  color: theme.colors.gray12,

  [mq("sm")]: {
    fontSize: 18,
    lineHeight: "28px",
  },
});
