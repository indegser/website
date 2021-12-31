import styled from "@emotion/styled";
import { PlateRenderElementProps } from "@udecode/plate-core";
import { ElementType } from "react";
import { colors } from "style.types";

export const Heading = (props: PlateRenderElementProps<HTMLHeadingElement>) => {
  return (
    <Container
      as={props.element.type as ElementType<any>}
      ref={props.attributes.ref}
    >
      {props.children}
    </Container>
  );
};

const Container = styled.h1`
  margin-top: 3rem;
  line-height: 1.24;
  color: ${colors.gray900};
`;
