import styled from "@emotion/styled";
import { theme } from "common/stitches.config";
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

const MotionContainer = styled.span`
  display: inline-block;
`;

const MotionLink = styled.a`
  cursor: pointer;
  color: ${theme.colors.accentFg.computedValue};
  text-decoration: underline;
`;
