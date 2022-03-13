import { Caption } from "./Caption";

import { styled } from "@src/common/stitches.config";
import { BlockType } from "@src/types/notion.types";

interface Props {
  block: Extract<BlockType, { type: "image" }>;
}

export const ImageBlock = ({ block }: Props) => {
  if (!("file" in block.image)) {
    console.warn("file is empty");
    return null;
  }

  const { caption } = block.image;
  const { url } = block.image.file;

  return (
    <Container>
      <Image src={url} alt="" />
      <Caption caption={caption} />
    </Container>
  );
};

const Container = styled("div", {
  margin: "0.25rem 0",
});

const Image = styled("img", {
  width: "100%",
  height: "auto",
  display: "block",
  margin: "1rem 0",
  borderRadius: "8px",
});
