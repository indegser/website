import { styled, theme } from "common/stitches.config";
import { mediaQueries } from "common/theme";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Transforms } from "slate";
import {
  ReactEditor,
  RenderElementProps,
  useSelected,
  useSlate,
} from "slate-react";
import { CustomBookmark } from "types/editor.types";
import { CaptionBlock } from "./CaptionBlock";

interface Props extends RenderElementProps {
  element: CustomBookmark;
}

export const BookmarkBlock = (props: Props) => {
  const [faviconLoaded, setFaviconLoaded] = useState(false);
  const { attributes, children, element } = props;
  const { openGraph, url } = element;

  const editor = useSlate();
  const selected = useSelected();

  useEffect(() => {
    if (openGraph) return;
    fetch(`/api/og?url=${url}`)
      .then((res) => res.json())
      .then((openGraph) => {
        const path = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, { openGraph }, { at: path });
      });
  }, [url, editor, openGraph, element]);

  useEffect(() => {
    if (!openGraph) return;
    const favicon = new Image();
    favicon.onload = (e) => {
      setFaviconLoaded(true);
    };

    favicon.src = openGraph.favicon;
  }, [openGraph]);

  return (
    <Figure {...attributes}>
      {children}
      {openGraph && (
        <div contentEditable={false}>
          <a
            href={url}
            title={openGraph.title}
            target="_blank"
            rel="noreferrer"
          >
            <Container
              whileTap={{ opacity: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Metadata>
                <Title>{openGraph.title}</Title>
                <Desc>{openGraph.description}</Desc>
                <Url>
                  {faviconLoaded && <CoverImage src={openGraph.favicon} />}
                  <UrlText>{decodeURIComponent(url)}</UrlText>
                </Url>
              </Metadata>
              {openGraph.imageUrl && (
                <Cover
                  style={{ backgroundImage: `url(${openGraph.imageUrl})` }}
                />
              )}
              {selected && <Halo />}
            </Container>
          </a>
          <CaptionBlock parentEditor={editor} parentElement={element} />
        </div>
      )}
    </Figure>
  );
};

const Figure = styled("figure", {
  margin: "44px 0",
});

const Container = styled(motion.div, {
  boxShadow: `0 0 0 .5px ${theme.colors.borderSubtle}`,
  display: "flex",
  margin: "8px -16px",
  cursor: "pointer",
  borderRadius: 1,
  overflow: "hidden",
  transition: ".2s background ease",
  position: "relative",

  [mediaQueries.hoverable]: {
    ["&:hover"]: {
      background: theme.colors.canvasInset,
    },
  },

  "@bp1": {
    margin: "8px 0",
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
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  marginBottom: 2,
});

const Desc = styled("div", {
  fontSize: 12,
  lineHeight: "17px",
  letterSpacing: "0em",
  color: "$fgMuted",
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": 2,
  overflow: "hidden",
  marginBottom: 4,
});

const Url = styled("div", {
  display: "flex",
  alignItems: "center",
  fontSize: 12,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

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
});

const Cover = styled("div", {
  flex: "1 1 100px",
  backgroundSize: "cover",
  backgroundPosition: "50% 50%",
});

const Halo = styled("div", {
  position: "absolute",
  pointerEvents: "none",
  inset: "0px",
  background: "rgba(46, 170, 220, 0.2)",
  zIndex: 81,
  opacity: 1,
});
