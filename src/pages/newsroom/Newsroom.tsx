import { PortableText } from "@portabletext/react";

import { useJournalListQuery } from "./Newsroom.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { mq } from "@src/design/theme/mediaQueries";
import { styled, theme } from "@src/design/theme/stitches.config";
import { usePageTracking } from "@src/utils/analytics/usePageTracking";

export const Newsroom = () => {
  usePageTracking("visit_newsroom");
  const { data: journalList } = useJournalListQuery();

  return (
    <NewsroomContainer>
      <SEO title="Newsroom" />
      <div>
        {journalList?.map((journal) => {
          console.log(journal.book);
          return (
            <JournalPreview key={journal._id}>
              <h2>{journal.title}</h2>
              <Article>
                <PortableText value={journal.content} />
              </Article>
            </JournalPreview>
          );
        })}
      </div>
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: "hidden",
});

const Article = styled("article", {
  fontSize: 16,
  lineHeight: "26px",
  letterSpacing: "-0.008em",
  paddingBottom: 80,
  fontWeight: 400,
  color: theme.colors.gray12,

  ["p"]: {
    margin: 0,
  },

  [mq("sm")]: {
    fontSize: 18,
    padding: "0 0 80px 0",
  },
});

const JournalPreview = styled("div", {
  width: 640,
});
