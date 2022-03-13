import { takeRightWhile } from "lodash-es";

import { HeadingBlock } from "./HeadingBlock";
import { ImageBlock } from "./ImageBlock";
import { NumberedListItemBlock } from "./NumberedListItemBlock";

import { styled } from "@src/common/stitches.config";
import { convertApiColorToStyleProps } from "@src/design/convertApiColorToStyleProps";
import { RichText } from "@src/design/RichText";
import { AnnotationColorType, BlockType } from "@src/types/notion.types";

interface Props {
  index: number;
  block: BlockType;
  blocks: BlockType[];
}

export const Block = ({ block, index, blocks }: Props) => {
  const renderContent = () => {
    switch (block.type) {
      case "paragraph": {
        return <RichText data={block.paragraph.rich_text} />;
      }
      case "image": {
        return <ImageBlock block={block} />;
      }
      case "heading_1": {
        return <HeadingBlock level={1} heading={block.heading_1} />;
      }
      case "heading_2": {
        return <HeadingBlock level={2} heading={block.heading_2} />;
      }
      case "heading_3": {
        return <HeadingBlock level={3} heading={block.heading_3} />;
      }
      case "numbered_list_item": {
        const marker = takeRightWhile(
          blocks.slice(0, index + 1),
          (result) => result.type === "numbered_list_item"
        ).length;

        return <NumberedListItemBlock block={block} marker={marker} />;
      }
      default: {
        return null;
      }
    }
  };

  const { color } = block[block.type] as { color: AnnotationColorType };
  const styleProps = convertApiColorToStyleProps(color);

  return <Section style={styleProps}>{renderContent()}</Section>;
};

const Section = styled("div", {
  margin: "0 auto",
  marginBottom: "1.4211em",
  maxWidth: 700,
});
