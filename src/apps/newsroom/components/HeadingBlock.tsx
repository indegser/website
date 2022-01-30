import styled from "@emotion/styled";
import { RenderElementProps } from "slate-react";
import { CustomHeading } from "types/editor.types";

interface Props extends RenderElementProps {
  element: CustomHeading;
}

export const HeadingBlock = ({ attributes, element, children }: Props) => {
  const { level } = element;

  return (
    <Container {...attributes}>
      <Heading as={`h${level}` as "h1" | "h2" | "h3"}>{children}</Heading>
    </Container>
  );
};

const Container = styled.div``;

const Heading = styled.h1`
  font-size: 2rem;
  line-height: 1.19;
  letter-spacing: -0.5px;
  font-weight: 700;
`;
