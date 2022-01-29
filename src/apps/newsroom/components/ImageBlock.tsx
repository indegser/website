import styled from "@emotion/styled";
import { CustomImage } from "global";
import { RenderElementProps } from "slate-react";

interface Props extends RenderElementProps {
  element: CustomImage;
}

export const ImageBlock = ({ children, attributes, element }: Props) => {
  const { url } = element;
  return (
    <Container {...attributes}>
      {children}
      <Image src={url} alt={url} />
    </Container>
  );
};

const Container = styled.div`
  margin: 3rem 0;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;
