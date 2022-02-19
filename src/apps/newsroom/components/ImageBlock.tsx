import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CustomImage } from "types/editor.types";
import { RenderElementProps } from "slate-react";
import { theme } from "common/stitches.config";

interface Props extends RenderElementProps {
  element: CustomImage;
}

export const ImageBlock = ({ children, attributes, element }: Props) => {
  const { url } = element;

  return (
    <Container {...attributes}>
      {children}
      <ImageContainer contentEditable={false}>
        <Image src={url} alt={url} />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0.25rem 0;
`;

const ImageContainer = styled.div`
  cursor: pointer;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;
