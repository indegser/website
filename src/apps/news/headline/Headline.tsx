import { MarkdownContainer } from "common/atoms/Container";
import { styled, theme } from "common/stitches.config";
import { mq } from "common/theme";
import { RenderElementProps } from "slate-react";
import { CustomHeadline } from "types/editor.types";
import { NewsDate } from "./NewsDate";
import { NewsTag } from "./NewsTag";

interface Props extends RenderElementProps {
  element: CustomHeadline;
}

export const NewsHeadline = ({ attributes, children }: Props) => {
  return (
    <Section>
      <MarkdownContainer>
        <Metadata contentEditable={false}>
          <NewsTag />
          <Divider />
          <NewsDate />
        </Metadata>
        <Title {...attributes}>{children}</Title>
      </MarkdownContainer>
    </Section>
  );
};

const Section = styled("section", {
  padding: "50px 0 10px",
  marginBottom: "40px",
});

const Metadata = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  gridGap: "0 12px",
  alignItems: "center",
  paddingBottom: 12,
  userSelect: "none",
});

const Title = styled("h1", {
  margin: 0,
  fontWeight: 700,
  fontSize: 48,
  letterSpacing: `-0.025em`,
  lineHeight: 1.15,

  [mq("sm")]: {
    fontSize: 32,
    lineHeight: 1.25,
  },
});

const Excerpt = styled("h3", {
  margin: 0,
  marginTop: 20,
  fontWeight: 520,
  fontSize: 22,
  letterSpacing: `-0.025em`,
  lineHeight: "1.3em",

  [mq("sm")]: {
    fontSize: 18,
  },
});

const Divider = styled("div", {
  width: 1,
  height: 10,
  background: theme.colors.borderDefault,
});
