import { useCallback, useEffect, useState } from "react";

import { Caption } from "./Caption";

import { mq } from "@src/design/theme/mediaQueries";
import { styled } from "@src/design/theme/stitches.config";
import { BlockType } from "@src/types/notion";

interface Props {
  block: Extract<BlockType, { type: "image" }>;
}

export const ImageBlock = ({ block }: Props) => {
  const [metadata, setMetadata] = useState<{ width: number; height: number }>(
    null
  );

  let url = "";

  if ("file" in block.image) {
    url = block.image.file.url;
  }

  if ("external" in block.image) {
    url = block.image.external.url;
  }

  const handleImageLoad = useCallback((event: Event) => {
    const image = event.target as HTMLImageElement;
    setMetadata({ width: image.width, height: image.height });
  }, []);

  useEffect(() => {
    if (!url || url.startsWith("data:image")) return;

    const image = new Image();
    image.addEventListener("load", handleImageLoad);

    image.src = url;

    return () => {
      image.removeEventListener("load", handleImageLoad);
    };
  }, [url, handleImageLoad]);

  if (!url || !metadata) return null;

  const { width, height } = metadata;
  const { caption } = block.image;

  return (
    <Container>
      <ImageLayout>
        <ImageElement src={url} alt="" layout={width > height ? "x" : "y"} />
      </ImageLayout>
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

const ImageLayout = styled("div", {
  display: "flex",
  justifyContent: "center",
});

const ImageElement = styled("img", {
  display: "block",
  borderRadius: "8px",

  variants: {
    layout: {
      x: {
        maxWidth: "100%",
        height: "auto",
      },
      y: {
        width: "auto",
        maxHeight: "80vh",
      },
    },
  },

  [mq("sm")]: {
    borderRadius: 0,
    width: "100% !important",
    height: "auto !important",
    maxWidth: "auto !important",
    maxHeight: "auto !important",
  },
});

const CaptionContainer = styled("div", {
  [mq("sm")]: {
    marginLeft: "max(22px,env(safe-area-inset-left))",
    marginRight: "max(22px,env(safe-area-inset-right))",
  },
});
