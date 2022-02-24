import { CustomImage } from "types/editor.types";
import { RenderElementProps, useSlateStatic } from "slate-react";
import { CaptionBlock } from "./CaptionBlock";
import { styled } from "common/stitches.config";

interface Props extends RenderElementProps {
  element: CustomImage;
}

export const ImageBlock = ({ children, attributes, element }: Props) => {
  const { url } = element;
  const editor = useSlateStatic();

  return (
    <Container {...attributes}>
      {children}
      <ImageContainer contentEditable={false}>
        <Image src={url} alt={url} />
      </ImageContainer>
      <CaptionBlock parentEditor={editor} parentElement={element} />
    </Container>
  );
};

const Container = styled("div", {
  margin: "0.25rem 0",
});

const ImageContainer = styled("div", {
  cursor: "pointer",
  position: "relative",
  margin: "1rem 0",
});

const Image = styled("img", {
  width: "100%",
  height: "auto",
  display: "block",
});
