import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { JournalGroup } from "./JournalGroup";
import { useJournalQuery } from "./Newsroom.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { styled } from "@src/design/theme/stitches.config";
import { usePageTracking } from "@src/utils/analytics/usePageTracking";

interface Props {}

export const Newsroom = (props: Props) => {
  usePageTracking("visit_newsroom");
  const { isReady } = useRouter();
  const { ref, inView } = useInView();

  const { data, fetchNextPage } = useJournalQuery();

  useEffect(() => {
    if (inView && isReady) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [inView, isReady]);

  return (
    <NewsroomContainer>
      <SEO title="홈" />
      <Layout>
        {data?.pages.map((page) => (
          <JournalGroup key={page.next_cursor} page={page} />
        ))}
        <div ref={ref} />
      </Layout>
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: "hidden",
});

const Layout = styled("div", {});
