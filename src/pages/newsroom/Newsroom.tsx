import { JournalContent } from "./JournalContent";
import { JournalMeta } from "./JournalMeta";
import { useJournalListQuery } from "./Newsroom.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { Embed } from "@src/design/organs/content/embed/Embed";
import { styled, theme } from "@src/design/theme/stitches.config";
import { usePageTracking } from "@src/utils/analytics/usePageTracking";

export const Newsroom = () => {
  usePageTracking("visit_newsroom");
  const { data: journalList } = useJournalListQuery();

  return (
    <NewsroomContainer>
      <Layout>
        <Center>
          <JournalList>
            {journalList?.map((journal) => {
              return (
                <JournalPreview key={journal._id}>
                  <Attribution>
                    <JournalMeta journal={journal} />
                  </Attribution>
                  <JournalContent journal={journal} />
                  {journal.url && <Embed url={journal.url} />}
                </JournalPreview>
              );
            })}
          </JournalList>
        </Center>
      </Layout>
      <SEO title="Newsroom" />
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: "hidden",
});

const Layout = styled("div", {});

const Center = styled("div", {
  display: "flex",
  justifyContent: "center",
});

const JournalList = styled("div", {
  display: "flex",
  flexDirection: "column",
  maxWidth: 600,
  borderColor: theme.colors.gray5,
});

const Attribution = styled("div", {
  color: theme.colors.gray10,
  marginBottom: 8,
});

const JournalPreview = styled("div", {
  padding: "32px 0px",
  boxSizing: "border-box",
  borderBottom: `1px solid ${theme.colors.gray5}`,
});
