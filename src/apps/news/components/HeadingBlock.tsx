import { styled, theme } from "@src/common/stitches.config";
import { RenderElementProps } from "slate-react";
import { CustomHeading } from "@src/types/editor.types";

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
  lineHeight: 1.25,

  ['&[data-level="1"]']: {
    marginTop: 50,
    marginBottom: 25,
    fontSize: "1.45em",
  },
  ['&[data-level="2"]']: {
    fontSize: "1.25em",
    marginTop: 50,
    marginBottom: 20,
  },
  ['&[data-level="3"]']: {
    fontSize: "1.15em",
    margin: "1em 0",
  },
});
