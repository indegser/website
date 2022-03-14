import { takeRightWhile } from "lodash-es";

import { BookmarkBlock } from "./BookmarkBlock";
import { BulletedListItemBlock } from "./BulletedListItemBlock";
import { HeadingBlock } from "./HeadingBlock";
import { ImageBlock } from "./ImageBlock";
import { NumberedListItemBlock } from "./NumberedListItemBlock";
import { QuoteBlock } from "./QuoteBlock";

import { PageContent } from "@src/common/atoms/Container";
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
  const { color } = block[block.type] as { color: AnnotationColorType };
  const styleProps = convertApiColorToStyleProps(color);

  const renderContent = () => {
    switch (block.type) {
      case "paragraph": {
        return (
          <PageContent style={styleProps}>
            <RichText data={block.paragraph.rich_text} />
          </PageContent>
        );
      }
      case "image": {
        return <ImageBlock block={block} />;
      }
      case "heading_1": {
        return (
          <PageContent style={styleProps}>
            <HeadingBlock level={1} heading={block.heading_1} />
          </PageContent>
        );
      }
      case "heading_2": {
        return (
          <PageContent style={styleProps}>
            <HeadingBlock level={2} heading={block.heading_2} />
          </PageContent>
        );
      }
      case "heading_3": {
        return (
          <PageContent style={styleProps}>
            <HeadingBlock level={3} heading={block.heading_3} />
          </PageContent>
        );
      }
      case "numbered_list_item": {
        const marker = takeRightWhile(
          blocks.slice(0, index + 1),
          (result) => result.type === "numbered_list_item"
        ).length;

        return (
          <PageContent style={styleProps}>
            <NumberedListItemBlock block={block} marker={marker} />
          </PageContent>
        );
      }
      case "bulleted_list_item": {
        return (
          <PageContent style={styleProps}>
            <BulletedListItemBlock block={block} />
          </PageContent>
        );
      }
      case "bookmark": {
        return (
          <PageContent style={styleProps}>
            <BookmarkBlock block={block} />
          </PageContent>
        );
      }
      case "quote": {
        return (
          <PageContent style={styleProps}>
            <QuoteBlock block={block} />
          </PageContent>
        );
      }
      default: {
        return null;
      }
    }
  };

  return <Section>{renderContent()}</Section>;
};

const Section = styled("div", {
  marginBottom: "1.4211em",
});
