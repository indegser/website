import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Caption } from "../Caption";
import { useBookmarkBlock } from "./BookmarkBlock.hooks";

import { mediaQueries } from "@src/design/theme/mediaQueries";
import { styled, theme } from "@src/design/theme/stitches.config";
import { BlockType } from "@src/types/notion";

interface Props {
  block: Extract<BlockType, { type: "bookmark" }>;
}

export const BookmarkBlock = ({ block }: Props) => {
  const { url } = block.bookmark;
  const [faviconLoaded, setFaviconLoaded] = useState(false);
  const { data: metadata } = useBookmarkBlock(url);

  useEffect(() => {
    if (!metadata || !metadata.favicon) return;
    const favicon = new Image();
    favicon.onload = (e) => {
      setFaviconLoaded(true);
    };

    favicon.src = metadata.favicon;
  }, [metadata]);

  return (
    <Figure>
      <a href={url} title={metadata?.title} target="_blank" rel="noreferrer">
        <Container whileTap={{ opacity: 0.8 }} transition={{ duration: 0.2 }}>
          <Metadata>
            <Title>{metadata?.title}</Title>
            <Desc>{metadata?.description}</Desc>
            <Url>
              {faviconLoaded && <CoverImage src={metadata.favicon} />}
              <UrlText>{decodeURIComponent(url)}</UrlText>
            </Url>
          </Metadata>
          <Cover
            style={{
              backgroundImage:
                metadata?.imageUrl && `url(${metadata.imageUrl})`,
            }}
          />
        </Container>
      </a>
      <Caption caption={block.bookmark.caption} />
    </Figure>
  );
};

const Figure = styled("figure", {
  margin: "1.65em 0",
});

const Container = styled(motion.div, {
  boxShadow: `0 0 0 1px ${theme.colors.gray6}`,
  display: "flex",
  margin: "8px 0",
  cursor: "pointer",
  borderRadius: 1,
  overflow: "hidden",
  transition: ".2s background ease",
  position: "relative",

  [mediaQueries.hoverable]: {
    ["&:hover"]: {
      background: theme.colors.gray3,
    },
  },
});

const Metadata = styled("div", {
  flex: "4 1",
  padding: 16,
  position: "relative",
  boxSizing: "border-box",
  overflow: "hidden",
});

const Title = styled("div", {
  fontSize: 14,
  lineHeight: "22px",
  height: "22px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  marginBottom: 2,
  color: theme.colors.gray12,

  ["&:empty"]: {
    background: theme.colors.gray6,
    borderRadius: 4,
  },
});

const Desc = styled("div", {
  fontSize: 13,
  lineHeight: "17px",
  letterSpacing: "0em",
  color: theme.colors.gray11,
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": 2,
  overflow: "hidden",
  marginBottom: 4,

  ["&:empty"]: {
    background: theme.colors.gray6,
    borderRadius: 4,
    height: 17,
  },
});

const Url = styled("div", {
  display: "flex",
  alignItems: "center",
  fontSize: 12,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: theme.colors.gray10,

  ["& img"]: {},
});

const CoverImage = styled("img", {
  width: 14,
  height: 14,
  objectFit: "cover",
  marginRight: 6,
});

const UrlText = styled("div", {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  lineHeight: "15px",
  letterSpacing: 0,
});

const Cover = styled("div", {
  flex: "1 1 100px",
  backgroundSize: "cover",
  backgroundPosition: "50% 50%",
  backgroundColor: theme.colors.gray6,
});
