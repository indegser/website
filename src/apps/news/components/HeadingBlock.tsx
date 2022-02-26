import { styled, theme } from "common/stitches.config";
import { RenderElementProps } from "slate-react";
import { CustomHeading } from "types/editor.types";

interface Props extends RenderElementProps {
  element: CustomHeading;
}

export const HeadingBlock = ({ attributes, element, children }: Props) => {
  const { level } = element;
  const as = `h${level}` as "h1" | "h2" | "h3";

  return (
    <Container {...attributes}>
      <Heading as={as} data-level={level}>
        {children}
      </Heading>
    </Container>
  );
};

HeadingBlock.toString = () => ".heading-block";

const Container = styled("div", {});

const Heading = styled("h1", {
  fontWeight: 600,
  ['&[data-level="1"]']: {
    paddingBottom: 6,
    marginTop: "3rem",
    marginBottom: "2rem",
    fontSize: "1.68rem",
    borderBottom: `1px solid ${theme.colors.borderMuted}`,
  },
  ['&[data-level="2"]']: {
    fontSize: "1.4rem",
    margin: "1rem 0",
  },
  ['&[data-level="3"]']: {
    fontSize: "1.2rem",
    margin: "1rem 0",
  },
});
