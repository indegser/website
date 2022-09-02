import { NewsPreview } from "./NewsPreview";
import { SeriesFilter } from "./series-filter/SeriesFilter";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { mq } from "@src/design/theme/mediaQueries";
import { styled } from "@src/design/theme/stitches.config";
import { NewsDatabaseType } from "@src/types/news.types";
import { usePageTracking } from "@src/utils/analytics/usePageTracking";

interface Props {
  initialData: NewsDatabaseType;
}

export const Newsroom = ({ initialData }: Props) => {
  usePageTracking("visit_newsroom");

  return (
    <NewsroomContainer>
      <SEO title="Newsroom" />
      <SeriesFilter />
      <ContentList>
        {initialData.results.map((news) => (
          <NewsPreview key={news.id} news={news} />
        ))}
      </ContentList>
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: "hidden",
});

const ContentList = styled("section", {
  marginTop: 40,
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
