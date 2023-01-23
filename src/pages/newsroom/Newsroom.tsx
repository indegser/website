import { JournalGroup } from "./JournalGroup";
import { useJournalQuery } from "./Newsroom.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
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
});

const Layout = styled("div", {});
