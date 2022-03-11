import { styled } from "@src/common/stitches.config";
import { RenderLeafProps } from "slate-react";

interface Props extends RenderLeafProps {}

export const TextLeaf = (props: Props) => {
  const { attributes, children, leaf } = props;
  let wrappedChildren = children;

  if (leaf.code) {
    wrappedChildren = <Code>{children}</Code>;
  }

  return (
    <Wrapper>
      {leaf.placeholder === true ? (
        <Placeholder contentEditable={false}>텍스트 추가</Placeholder>
      ) : null}
      <Container
        {...attributes}
        bold={leaf.bold}
        italic={leaf.italic}
        underline={leaf.underline}
        highlight={leaf.highlight}
      >
        {wrappedChildren}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled("span", {});

const Placeholder = styled("span", {
  opacity: 0.333,
  position: "absolute",
  pointerEvents: "none",
  left: 2,
  minWidth: 200,
  fontSize: "0.95em",
  userSelect: "none",
});

const Container = styled("span", {
  // The following is a workaround for a Chromium bug where,
  // if you have an inline at the end of a block,
  // clicking the end of a block puts the cursor inside the inline
  // instead of inside the final {text: ''} node
  // https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364

  variants: {
    bold: {
      true: {
        fontWeight: 640,
      },
    },
    italic: {
      true: {
        fontStyle: "italic",
      },
    },
    underline: {
      true: {
        textDecoration: "underline",
      },
    },
    highlight: {
      true: {
        backgroundColor: "$accentSubtle",
      },
    },
  },
});

const Code = styled("code", {
  padding: "4px 6px",
  borderRadius: "0.2em",
  fontSize: "0.85em",
  margin: "0 4px",
  fontFamily: "$mono",
  backgroundColor: "$canvasInset",
});
