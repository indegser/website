import styled from "@emotion/styled";
import { RenderElementProps } from "slate-react";
import { colors } from "types/style.types";
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
  color: ${colors.blue500};
  text-decoration: underline;
`;
