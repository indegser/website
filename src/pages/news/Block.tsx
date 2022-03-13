import { HeadingBlock } from "./HeadingBlock";
import { ImageBlock } from "./ImageBlock";
import { NumberedListItemBlock } from "./NumberedListItemBlock";

import { styled } from "@src/common/stitches.config";
import { RichText } from "@src/design/RichText";
import { BlockType } from "@src/types/notion.types";

interface Props {
  block: BlockType;
}

export const Block = ({ block }: Props) => {
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
        return <NumberedListItemBlock block={block} />;
      }
      default: {
        return null;
      }
    }
  };

  return <Section>{renderContent()}</Section>;
};

const Section = styled("div", {
  margin: "0 auto",
  marginBottom: "1.4211em",
  maxWidth: 700,
});
