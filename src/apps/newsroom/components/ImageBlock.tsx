import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CustomImage } from "types/editor.types";
import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { colors } from "style.types";

interface Props extends RenderElementProps {
  element: CustomImage;
}

export const ImageBlock = ({ children, attributes, element }: Props) => {
  const { url } = element;

  const selected = useSelected();
  const focused = useFocused();

  const isActive = selected && focused;

  return (
    <Container {...attributes}>
      {children}
      <ImageContainer contentEditable={false}>
        <Image src={url} alt={url} />
        <ImageHalo animate={{ opacity: isActive ? 0.35 : 0 }} />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 3rem 0;
`;

const ImageContainer = styled.div`
  cursor: pointer;
  position: relative;
`;

const ImageHalo = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.blue500};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;
