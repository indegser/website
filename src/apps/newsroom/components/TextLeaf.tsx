import { styled } from "common/stitches.config";
import { RenderLeafProps } from "slate-react";

interface Props extends RenderLeafProps {}

export const TextLeaf = (props: Props) => {
  const { attributes, children, leaf } = props;
  let wrappedChildren = children;

  if (leaf.code) {
    wrappedChildren = <Code>{children}</Code>;
  }

  return (
    <Container
      data-is-empty={leaf.text === ""}
      {...attributes}
      bold={leaf.bold}
      italic={leaf.italic}
      underline={leaf.underline}
      highlight={leaf.highlight}
    >
      {wrappedChildren}
    </Container>
  );
};

const Container = styled("span", {
  // The following is a workaround for a Chromium bug where,
  // if you have an inline at the end of a block,
  // clicking the end of a block puts the cursor inside the inline
  // instead of inside the final {text: ''} node
  // https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
  // ['&[data-is-empty="true"']: {
  //   paddingLeft: 0.1,
  // },
  variants: {
    bold: {
      true: {
        fontWeight: "bold",
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
