import Link from "next/link";

import { useBookListQuery, useJournalListQuery } from "./Newsroom.hooks";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { mq } from "@src/design/theme/mediaQueries";
import { styled } from "@src/design/theme/stitches.config";
import { usePageTracking } from "@src/utils/analytics/usePageTracking";

export const Newsroom = () => {
  usePageTracking("visit_newsroom");
  const { data, isLoading } = useBookListQuery();
  const { data: journalList } = useJournalListQuery();

  console.log(journalList);

  return (
    <NewsroomContainer>
      <SEO title="Newsroom" />
      <ContentList>
        {data?.map((book) => (
          <Link
            key={book._id}
            href={{ pathname: "journals", query: { book: book._id } }}
          >
            <div>{book.title}</div>
          </Link>
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
