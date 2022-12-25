import { useBooksQuery } from "./Newsroom.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { mq } from "@src/design/theme/mediaQueries";
import { styled } from "@src/design/theme/stitches.config";
import { usePageTracking } from "@src/utils/analytics/usePageTracking";

export const Newsroom = () => {
  usePageTracking("visit_newsroom");
  const { data, isLoading } = useBooksQuery();

  return (
    <NewsroomContainer>
      <SEO title="Newsroom" />
      <ContentList>
        {data?.map((book) => (
          <div key={book._id}>{book.title}</div>
        ))}
      </ContentList>
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: "hidden",
});

const ContentList = styled("section", {
  marginTop: 0,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "0 48px",

  [mq("lg")]: {
    width: 692,
    marginLeft: "auto",
    marginRight: "auto",
    gridTemplateColumns: "1fr",
  },
  [mq("sm")]: {
    marginTop: 20,
    width: "auto",
    marginRight: 0,
  },
});
