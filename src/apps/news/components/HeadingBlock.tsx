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
  fontWeight: 720,
  ['&[data-level="1"]']: {
    paddingBottom: 6,
    marginTop: "2rem",
    marginBottom: "0rem",
    fontSize: "1.88rem",
  },
  ['&[data-level="2"]']: {
    fontSize: "1.52rem",
    marginTop: "1rem",
    marginBottom: 0,
  },
  ['&[data-level="3"]']: {
    fontSize: "1.24rem",
    marginTop: "1rem",
    marginBottom: 0,
  },
});
