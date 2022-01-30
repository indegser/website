import { styled, theme } from "common/stitches.config";
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

const Container = styled("div", {});

const Heading = styled("h1", {
  borderBottom: `1px solid ${theme.colors.borderMuted}`,
  paddingBottom: 6,
  fontSize: "1.68rem",
  fontWeight: 600,
  marginTop: "3rem",
  marginBottom: "2rem",
});
