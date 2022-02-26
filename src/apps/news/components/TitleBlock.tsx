import { CustomTitle } from "types/editor.types";
import { RenderElementProps } from "slate-react";
import { styled } from "common/stitches.config";
import { useTagsQuery } from "queries/useTagsQuery";
import * as Popover from "@radix-ui/react-popover";

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

const Container = styled("div", {
  paddingBottom: 20,
});

const TopArea = styled("div", {
  marginTop: 40,
  "@bp1": {
    marginTop: 80,
  },
});

const Title = styled("h1", {
  margin: 0,
  fontWeight: 760,
  fontSize: 41,
  letterSpacing: `-0.025em`,
  lineHeight: "1.1em",

  "@bp1": {
    fontSize: 48,
  },
});
