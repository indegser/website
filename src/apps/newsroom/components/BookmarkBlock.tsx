import { styled } from "common/stitches.config";
import { useEffect } from "react";
import { Transforms } from "slate";
import { RenderElementProps, useSlate } from "slate-react";
import { CustomBookmark } from "types/editor.types";

interface Props extends RenderElementProps {
  element: CustomBookmark;
}

export const BookmarkBlock = (props: Props) => {
  const { attributes, children, element } = props;
  const { openGraph, url } = element;
  const editor = useSlate();

  useEffect(() => {
    if (openGraph) return;
    fetch(`/api/og?url=${url}`)
      .then((res) => res.json())
      .then((openGraph) => {
        Transforms.setNodes(editor, { openGraph });
      });
  }, [url, editor, openGraph]);

  return (
    <div {...attributes}>
      {children}
      <Container contentEditable={false}>
        {openGraph && (
          <>
            <Metadata>
              <Title>{openGraph.title}</Title>
              <Desc>{openGraph.description}</Desc>
              <Url>
                <img src={openGraph.favicon} alt={openGraph.title} />
                <div>{decodeURIComponent(url)}</div>
              </Url>
            </Metadata>
            <Cover style={{ backgroundImage: `url(${openGraph.imageUrl})` }} />
          </>
        )}
      </Container>
    </div>
  );
};

const Container = styled("div", {
  border: "1px solid",
  borderColor: "$borderSubtle",
  display: "flex",
  margin: "8px 0",
  cursor: "pointer",
  transition: ".2s background ease",
  ["&:hover"]: {
    backgroundColor: "$canvasSubtle",
  },
});

const Metadata = styled("div", {
  flex: "4 1",
  padding: 16,
  position: "relative",
  boxSizing: "border-box",
  overflow: "hidden",
  borderRight: "1px solid",
  borderColor: "$borderSubtle",
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

const Cover = styled("div", {
  flex: "1 1 100px",
  backgroundSize: "cover",
  backgroundPosition: "50% 50%",
});
