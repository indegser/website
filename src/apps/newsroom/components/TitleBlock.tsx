import { CustomTitle } from "types/editor.types";
import { RenderElementProps } from "slate-react";
import { styled } from "common/stitches.config";

interface Props extends RenderElementProps {
  element: CustomTitle;
}

export const TitleBlock = (props: Props) => {
  const { attributes, children } = props;

  return (
    <Container>
      <TopArea />
      <Title {...attributes}>{children}</Title>
    </Container>
  );
};

const Container = styled("div", {});

const TopArea = styled("div", {
  marginTop: 40,
  "@bp1": {
    marginTop: 80,
  },
});

const Title = styled("h1", {
  fontSize: "2rem",
  lineHeight: 1.24,
  margin: 0,

  "@bp1": {
    fontSize: "2.4rem",
  },
});
