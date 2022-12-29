import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { ContentGroup } from "./ContentGroup";
import { useJournalQuery } from "./Newsroom.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { styled } from "@src/design/theme/stitches.config";
import { usePageTracking } from "@src/utils/analytics/usePageTracking";

export const Newsroom = () => {
  usePageTracking("visit_newsroom");
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetching, isInitialLoading, hasNextPage } =
    useJournalQuery();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <NewsroomContainer>
      <SEO title="홈" />
      <Layout>
        {data?.pages.map((page) => (
          <ContentGroup key={page.next_cursor} page={page} />
        ))}
        {!isInitialLoading && <div ref={ref} />}
      </Layout>
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: "hidden",
});

const Layout = styled("div", {});
