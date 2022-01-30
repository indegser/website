import styled from "@emotion/styled";
import { CustomTitle } from "types/editor.types";
import { RenderElementProps } from "slate-react";

interface Props extends RenderElementProps {
  element: CustomTitle;
}

export const TitleBlock = (props: Props) => {
  const { attributes, children, element } = props;

  return (
    <Container>
      <Title {...attributes}>{children}</Title>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h1`
  font-size: 2.4rem !important;
  line-height: 1.24 !important;
`;
