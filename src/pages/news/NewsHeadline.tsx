import dayjs from "dayjs";
import { useMemo } from "react";

import { MarkdownContainer } from "@src/common/atoms/Container";
import { styled, theme } from "@src/common/stitches.config";
import { mq } from "@src/common/theme";
import { RichText } from "@src/design/RichText";
import { NewsType } from "@src/types/notion.types";

interface Props {
  news: NewsType;
}

export const NewsHeadline = ({ news }: Props) => {
  const { title, category, published_time } = news.properties;

  const publishedAt = useMemo(() => {
    return dayjs(published_time.date.start).locale("en").format("MMMM D, YYYY");
  }, [published_time]);

  const categoryName = category.multi_select[0]?.name;

  return (
    <Section>
      <MarkdownContainer>
        <Metadata>
          {categoryName ? (
            <>
              <Property>{category.multi_select[0].name}</Property>
              <Divider />
            </>
          ) : null}
          <Property>{publishedAt}</Property>
        </Metadata>
        <Title>
          <RichText shouldRenderPlainText data={title.title} />
        </Title>
      </MarkdownContainer>
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
  color: theme.colors.fgSubtle,
});

const Divider = styled("div", {
  width: 1,
  height: 10,
  background: theme.colors.borderDefault,
});
