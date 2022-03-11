import { CustomImage } from "@src/types/editor.types";
import { RenderElementProps, useSlateStatic } from "slate-react";
import { CaptionBlock } from "./CaptionBlock";
import { styled } from "@src/common/stitches.config";

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
        <CaptionBlock parentEditor={editor} parentElement={element} />
      </ImageContainer>
    </Container>
  );
};

const Container = styled("div", {
  margin: "0.25rem 0",
});

const ImageContainer = styled("div", {
  position: "relative",
});

const Image = styled("img", {
  width: "100%",
  height: "auto",
  display: "block",
  margin: "1rem 0",
});
