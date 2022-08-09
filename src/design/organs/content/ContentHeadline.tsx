import { styled } from "@stitches/react";
import dayjs from "dayjs";
import { useMemo } from "react";

import { PageContent } from "@src/design/atoms/Container";
import { mq } from "@src/design/theme/mediaQueries";
import { theme } from "@src/design/theme/stitches.config";
import { ContentHeadlineType } from "@src/types/content.types";

interface Props extends ContentHeadlineType {}

export const ContentHeadline = ({ title, lastEditedTime }: Props) => {
  const formattedLastEditedTime = useMemo(() => {
    return dayjs(lastEditedTime).locale("en").format("MMMM D, YYYY");
  }, [lastEditedTime]);

  return (
    <Section>
      <PageContent>
        <Metadata>
          <Property>{formattedLastEditedTime}</Property>
        </Metadata>
        <Title>{title}</Title>
      </PageContent>
    </Section>
  );
};

const Section = styled("section", {
  padding: "50px 0 10px",
  marginBottom: "40px",

  [mq("sm")]: {
    paddingTop: 30,
    marginBottom: 20,
  },
});

const Metadata = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  gridGap: "0 12px",
  alignItems: "center",
  paddingBottom: 12,
  userSelect: "none",

  [mq("sm")]: {
    paddingBottom: 6,
  },
});

const Title = styled("h1", {
  margin: 0,
  fontWeight: 800,
  fontSize: 48,
  letterSpacing: `-0.025em`,
  lineHeight: 1.15,
  color: theme.colors.gray12,
  wordBreak: "keep-all",

  [mq("sm")]: {
    fontSize: 36,
    letterSpacing: "-0.015em",
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

const Property = styled("div", {
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.gray11,
});

const Divider = styled("div", {
  width: 1,
  height: 10,
  background: theme.colors.gray11,
});
