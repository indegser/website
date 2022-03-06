import { styled, theme } from "common/stitches.config";
import { RenderElementProps } from "slate-react";
import { CustomLink } from "types/editor.types";

interface Props extends RenderElementProps {
  element: CustomLink;
}

export const LinkLeaf = ({ attributes, element, children }: Props) => {
  return (
    <MotionContainer {...attributes}>
      <MotionLink href={element.url}>{children}</MotionLink>
    </MotionContainer>
  );
};

const MotionContainer = styled("span", {});

const MotionLink = styled("a", {
  cursor: "pointer",
  textDecoration: "none",
  color: theme.colors.accentFg,

  ["&:hover"]: {
    textDecoration: "underline",
  },
});
