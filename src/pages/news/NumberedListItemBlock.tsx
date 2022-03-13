import { styled } from "@src/common/stitches.config";
import { RichText } from "@src/design/RichText";
import { BlockType } from "@src/types/notion.types";

interface Props {
  block: Extract<BlockType, { type: "numbered_list_item" }>;
}

export const NumberedListItemBlock = ({ block }: Props) => {
  const { numbered_list_item } = block;
  return (
    <Container>
      <Marker>1.</Marker>
      <Content>
        <div>
          <RichText data={numbered_list_item.rich_text} />
        </div>
      </Content>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  alignItems: "start",
  paddingLeft: 2,
  width: "100%",
});

const Marker = styled("div", {
  width: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 25,
  marginRight: 2,
});

const Content = styled("div", {
  flex: "1 1 0px",
  minWidth: 1,
  display: "flex",
  flexDirection: "column",
});
