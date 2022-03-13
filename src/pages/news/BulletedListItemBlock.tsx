import { styled } from "@src/common/stitches.config";
import { RichText } from "@src/design/RichText";
import { BlockType } from "@src/types/notion.types";

interface Props {
  block: Extract<BlockType, { type: "bulleted_list_item" }>;
}

export const BulletedListItemBlock = ({ block }: Props) => {
  const { bulleted_list_item } = block;

  return (
    <Container>
      <Marker>•</Marker>
      <Content>
        <div>
          <RichText data={bulleted_list_item.rich_text} />
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
  height: `25px`,
  marginRight: 2,
  lineHeight: `25px`,
  fontSize: `1.1em`,
});

const Content = styled("div", {
  flex: "1 1 0px",
  minWidth: 1,
  display: "flex",
  flexDirection: "column",
});
