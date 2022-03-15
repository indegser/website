import { takeRightWhile } from "lodash-es";

import { BookmarkBlock } from "./BookmarkBlock";
import { BulletedListItemBlock } from "./BulletedListItemBlock";
import { HeadingBlock } from "./HeadingBlock";
import { ImageBlock } from "./ImageBlock";
import { NumberedListItemBlock } from "./NumberedListItemBlock";
import { QuoteBlock } from "./QuoteBlock";

import { PageContent } from "@src/common/atoms/Container";
import { styled } from "@src/common/stitches.config";
import { mq } from "@src/common/theme";
import { convertApiColorToStyleProps } from "@src/design/convertApiColorToStyleProps";
import { RichText } from "@src/design/RichText";
import { AnnotationColorType, BlockType } from "@src/types/notion.types";

interface Props {
  index: number;
  block: BlockType;
  blocks: BlockType[];
  depth?: number;
}

export const Block = ({ block, index, blocks, depth = 0 }: Props) => {
  const { color } = block[block.type] as { color: AnnotationColorType };
  const styleProps = convertApiColorToStyleProps(color);

  const renderContent = (block: BlockType) => {
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
          blocks.slice(0, index),
          (result) => result.type === "numbered_list_item"
        ).length;

        return (
          <PageContent style={styleProps}>
            <NumberedListItemBlock
              depth={depth}
              block={block}
              marker={marker}
            />
          </PageContent>
        );
      }
      case "bulleted_list_item": {
        return (
          <PageContent style={styleProps}>
            <BulletedListItemBlock depth={depth} block={block} />
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

  if (block.type === "column_list") {
    return (
      <ColumnGrid>
        {block.children.map((childBlock, index) => (
          <Block
            key={childBlock.id}
            block={childBlock}
            index={index}
            depth={depth + 1}
            blocks={block.children}
          />
        ))}
      </ColumnGrid>
    );
  }

  return (
    <Section>
      {renderContent(block)}
      {block.children ? (
        <ChildSection
          style={{ padding: block.type === "column" ? "0px !important" : "" }}
        >
          {block.children.map((childBlock, index) => (
            <Block
              key={childBlock.id}
              block={childBlock}
              index={index}
              depth={depth + 1}
              blocks={block.children}
            />
          ))}
        </ChildSection>
      ) : null}
    </Section>
  );
};

const ColumnGrid = styled(PageContent, {
  display: "grid",
  columnGap: 20,
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",

  [mq("sm")]: {
    display: "block",
  },
});

const Section = styled("div", {
  padding: "4px 0",
  margin: "1px 0",
  marginBottom: "1em",
});

const ChildSection = styled(PageContent, {
  paddingLeft: "27px",
});
