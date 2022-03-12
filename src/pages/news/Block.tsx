import { ImageBlock } from "./ImageBlock";

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
      default: {
        console.log(block);
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
