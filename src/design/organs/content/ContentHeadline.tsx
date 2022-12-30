import { styled } from "@stitches/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import Balancer from "react-wrap-balancer";

import { RelatedBook } from "./RelatedBook";

import { PageContent } from "@src/design/atoms/Container";
import { mq } from "@src/design/theme/mediaQueries";
import { theme } from "@src/design/theme/stitches.config";
import { useBooksQuery } from "@src/queries/useBooksQuery";
import { JournalPageType } from "@src/types/notion";
import { getNotionTitle } from "@src/utils/notion";

interface Props {
  page: JournalPageType;
}

export const ContentHeadline = (props: Props) => {
  const {
    page: { last_edited_time, properties },
  } = props;

  const formattedLastEditedTime = useMemo(() => {
    return dayjs(last_edited_time).locale("en").format("MMMM D, YYYY");
  }, [last_edited_time]);

  return (
    <Section>
      <PageContent>
        <Metadata>
          <Property>
            <RelatedBook relation={properties.Book} />
            <Divider />
            {formattedLastEditedTime}
          </Property>
        </Metadata>
        <Balancer>
          <Title>{getNotionTitle(properties.Title)}</Title>
        </Balancer>
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

const Property = styled("div", {
  fontSize: 13,
  fontWeight: 500,
  color: theme.colors.gray11,
  display: "flex",
  gap: 10,
  alignItems: "center",
});

const Divider = styled("div", {
  width: 1,
  height: 14,
  background: theme.colors.gray10,
  display: "none",

  ["* + &"]: {
    display: "block",
  },
});
