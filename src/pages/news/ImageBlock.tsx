import { styled, theme } from "@src/common/stitches.config";
import { RichText } from "@src/design/RichText";
import { BlockType } from "@src/types/notion.types";

interface Props {
  block: Extract<BlockType, { type: "image" }>;
}

export const ImageBlock = ({ block }: Props) => {
  if (!("file" in block.image)) {
    console.warn("file is empty");
    return null;
  }

  const { url } = block.image.file;

  return (
    <Container>
      <Image src={url} alt="" />
      <Caption>
        <RichText data={block.image.caption} />
      </Caption>
    </Container>
  );
};

const Container = styled("div", {
  margin: "0.25rem 0",
});

const Caption = styled("div", {
  fontSize: 12,
  letterSpacing: 0,
  lineHeight: "16px",
  fontWeight: 600,
  color: theme.colors.fgMuted,
});

const Image = styled("img", {
  width: "100%",
  height: "auto",
  display: "block",
  margin: "1rem 0",
  borderRadius: "8px",
});
