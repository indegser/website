import { RichText } from "@src/design/notion/RichText";
import { styled } from "@src/design/theme/stitches.config";
import { BlockType } from "@src/types/notion.types";

interface Props {
  block: Extract<BlockType, { type: "quote" }>;
}

export const QuoteBlock = ({ block }: Props) => {
  return (
    <Container>
      <Content>
        <Text>
          <RichText data={block.quote.rich_text} />
        </Text>
      </Content>
    </Container>
  );
};

const Container = styled("div", {
  margin: "4px 0",
});

const Content = styled("div", {
  padding: "3px 2px",
  display: "flex",
});

const Text = styled("div", {
  padding: "0 0 0 14px",
  borderLeft: "3px solid currentColor",
});
