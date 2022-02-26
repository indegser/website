import { MarkdownContainer } from "common/atoms/Container";
import { styled, theme } from "common/stitches.config";
import { mq } from "common/theme";
import dayjs from "dayjs";
import { useNewsQuery } from "queries/useNewsQuery";
import { useRef, useState } from "react";
import { Descendant } from "slate";
import { Editable, RenderElementProps, Slate } from "slate-react";
import { useHeadlineEditor, useNewsPublishedAt } from "./Headline.hooks";
import { NewsTag } from "./NewsTag";

export const NewsHeadline = () => {
  const editor = useHeadlineEditor();
  const dateInputRef = useRef<HTMLInputElement>();
  const { data: news } = useNewsQuery();
  const value = dayjs(news.published_at).format("YYYY-MM-DD");
  const publishedAt = dayjs(news.published_at).format("MMMM D, YYYY");
  const [headlineValue, setHeadlineValue] = useState<Descendant[]>(() => [
    { type: "title", children: [{ text: news.title ?? "" }] },
    { type: "excerpt", children: [{ text: news.excerpt ?? "" }] },
  ]);

  const { handleDateInputChange } = useNewsPublishedAt();

  const renderElement = ({
    element,
    attributes,
    children,
  }: RenderElementProps) => {
    switch (element.type) {
      case "title": {
        return <Title {...attributes}>{children}</Title>;
      }
      case "excerpt": {
        return <Excerpt {...attributes}>{children}</Excerpt>;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Section>
      <MarkdownContainer>
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
        <Slate
          editor={editor}
          value={headlineValue}
          onChange={setHeadlineValue}
        >
          <Editable placeholder="제목없음" renderElement={renderElement} />
        </Slate>
      </MarkdownContainer>
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
  lineHeight: "1.25em",

  [mq("sm")]: {
    fontSize: 41,
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
