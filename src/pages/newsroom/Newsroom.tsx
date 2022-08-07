import { Books } from "./books/Books";
import { NewsPreview } from "./NewsPreview";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { mq } from "@src/design/theme/mediaQueries";
import { styled } from "@src/design/theme/stitches.config";
import { usePageTracking } from "@src/hooks/usePageTracking";
import { BookDatabaseType } from "@src/types/book.types";
import { DatabaseResponseType, NewsType } from "@src/types/notion.types";

interface Props {
  database: DatabaseResponseType;
  books: BookDatabaseType;
}

export const Newsroom = ({ database, books }: Props) => {
  const news = database.results.map((result) => (
    <NewsPreview key={result.id} news={result as NewsType} />
  ));

  usePageTracking("visit_newsroom");

  return (
    <NewsroomContainer>
      <SEO title="Newsroom" />
      <Books books={books} />
      <ContentList>{news}</ContentList>
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: "hidden",
});

const ContentList = styled("section", {
  marginTop: 40,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "0 24px",

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
