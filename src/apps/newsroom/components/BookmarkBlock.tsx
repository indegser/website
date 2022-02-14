import { styled, theme } from "common/stitches.config";
import { mediaQueries } from "common/theme";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Transforms } from "slate";
import {
  ReactEditor,
  RenderElementProps,
  useSelected,
  useSlate,
} from "slate-react";
import { CustomBookmark } from "types/editor.types";

interface Props extends RenderElementProps {
  element: CustomBookmark;
}

export const BookmarkBlock = (props: Props) => {
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

  return (
    <div {...attributes}>
      {children}
      {openGraph && (
        <a
          href={url}
          title={openGraph.title}
          target="_blank"
          rel="noreferrer"
          contentEditable={false}
        >
          <Container whileTap={{ opacity: 0.8 }} transition={{ duration: 0.2 }}>
            <Metadata>
              <Title>{openGraph.title}</Title>
              <Desc>{openGraph.description}</Desc>
              <Url>
                <img src={openGraph.favicon} alt={openGraph.title} />
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
      )}
    </div>
  );
};

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

  ["& img"]: {
    width: 14,
    height: 14,
    objectFit: "cover",
    marginRight: 6,
  },
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
