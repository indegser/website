import { styled, theme } from "common/stitches.config";
import { mq } from "common/theme";
import dayjs from "dayjs";
import { useNewsQuery } from "queries/useNewsQuery";
import { useRef } from "react";
import { useNewsPublishedAt } from "./Headline.hooks";
import { NewsTag } from "./NewsTag";

export const NewsHeadline = () => {
  const dateInputRef = useRef<HTMLInputElement>();
  const { data: news } = useNewsQuery();
  const value = dayjs(news.published_at).format("YYYY-MM-DD");
  const publishedAt = dayjs(news.published_at).format("MMMM D, YYYY");

  const { handleDateInputChange } = useNewsPublishedAt();

  return (
    <Section>
      <Metadata>
        <NewsTag />
        <Divider />
        <PublishedAt>
          {publishedAt}
          <input
            ref={dateInputRef}
            type="date"
            defaultValue={value}
            onChange={handleDateInputChange}
          />
        </PublishedAt>
      </Metadata>
      <Title>{news.title}</Title>
    </Section>
  );
};

const Section = styled("section", {
  padding: "50px 0",
});

const Metadata = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  gridGap: "0 12px",
  alignItems: "center",
  paddingBottom: 12,
});

const Title = styled("h1", {
  margin: 0,
  fontWeight: 760,
  fontSize: 48,
  letterSpacing: `-0.025em`,
  lineHeight: "1.1em",

  [mq("sm")]: {
    fontSize: 41,
  },
});

const PublishedAt = styled("div", {
  fontSize: 14,
  fontWeight: 560,
  color: theme.colors.fgSubtle,
});

const Divider = styled("div", {
  width: 1,
  height: 10,
  background: theme.colors.borderDefault,
});
