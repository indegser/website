import { PortableText } from "@portabletext/react";

import { BookFilter } from "./BookFilter";
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
      <Layout>
        <BookFilter />
        <Center>
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
        </Center>
        <div />
      </Layout>
      <SEO title="Newsroom" />
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: "hidden",
});

const Layout = styled("div", {
  display: "grid",
  gap: 20,
  gridTemplateColumns: `1fr max-content 1fr`,
});

const Center = styled("div", {
  display: "flex",
  justifyContent: "center",
});

const JournalList = styled("div", {
  display: "flex",
  flexDirection: "column",
  borderLeft: `1px solid`,
  borderRight: `1px solid`,
  maxWidth: 640,
  borderColor: theme.colors.gray5,
});

const Attribution = styled("div", {
  color: theme.colors.gray10,
  marginBottom: 8,
});

const Article = styled("div", {
  fontSize: 18,
  lineHeight: 1.58,
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
  padding: "32px 24px",
  boxSizing: "border-box",
  borderBottom: `1px solid ${theme.colors.gray5}`,
});
