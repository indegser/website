import { JournalGroup } from "./JournalGroup";
import { useJournalQuery } from "./Newsroom.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { mq } from "@src/design/theme/mediaQueries";
import { styled } from "@src/design/theme/stitches.config";
import { usePageTracking } from "@src/utils/analytics/usePageTracking";

interface Props {}

export const Newsroom = (props: Props) => {
  usePageTracking("visit_newsroom");

  const { data, fetchNextPage } = useJournalQuery();
  return (
    <NewsroomContainer>
      <SEO title="홈" />
      <Layout>
        {data?.pages.map((result, i) => (
          <JournalGroup
            key={i}
            page={result.data}
            onScrollToEnd={() => fetchNextPage()}
          />
        ))}
      </Layout>
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: "hidden",
  paddingTop: 32,
});

const Layout = styled("div", {
  display: "grid",
  gap: 20,
  gridTemplateColumns: "repeat(4, 1fr)",

  [mq("sm")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
});
