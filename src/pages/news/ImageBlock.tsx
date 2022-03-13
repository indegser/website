import { Caption } from "./Caption";

import { styled } from "@src/common/stitches.config";
import { mq } from "@src/common/theme";
import { BlockType } from "@src/types/notion.types";

interface Props {
  block: Extract<BlockType, { type: "image" }>;
}

export const ImageBlock = ({ block }: Props) => {
  let url = "";

  if ("file" in block.image) {
    url = block.image.file.url;
  }

  if ("external" in block.image) {
    url = block.image.external.url;
  }

  if (!url) return null;

  const { caption } = block.image;

  return (
    <Container>
      <Image src={url} alt="" />
      <CaptionContainer>
        <Caption caption={caption} />
      </CaptionContainer>
    </Container>
  );
};

const Container = styled("div", {
  margin: "44px 0",

  [mq("sm")]: {
    marginLeft: "calc(-1 * max(22px,env(safe-area-inset-left)))",
    marginRight: "calc(-1 * max(22px,env(safe-area-inset-right)))",
  },
});

const Image = styled("img", {
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: "8px",

  [mq("sm")]: {
    borderRadius: 0,
  },
});

const CaptionContainer = styled("div", {
  [mq("sm")]: {
    marginLeft: "max(22px,env(safe-area-inset-left))",
    marginRight: "max(22px,env(safe-area-inset-right))",
  },
});
