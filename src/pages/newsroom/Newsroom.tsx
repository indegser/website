import { PortableText } from "@portabletext/react";

import { JournalMeta } from "./JournalMeta";
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
      <JournalList>
        {journalList?.map((journal) => {
          return (
            <JournalPreview key={journal._id}>
              <Attribution>
                <JournalMeta journal={journal} />
              </Attribution>
              <Article>
                <PortableText value={journal.content} />
              </Article>
            </JournalPreview>
          );
        })}
      </JournalList>
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: "hidden",
});

const JournalList = styled("div", {
  width: 600,
  margin: "0 auto",
});

const Attribution = styled("div", {
  color: theme.colors.gray10,
  marginBottom: 4,
});

const Article = styled("article", {
  fontSize: 16,
  lineHeight: "26px",
  letterSpacing: "-0.008em",
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
