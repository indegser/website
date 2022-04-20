import { NewsPreview } from "./NewsPreview";

import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { mq } from "@src/design/theme/mediaQueries";
import { styled } from "@src/design/theme/stitches.config";
import { usePageTracking } from "@src/hooks/usePageTracking";
import { DatabaseResponseType, NewsType } from "@src/types/notion.types";

interface Props {
  database: DatabaseResponseType;
}

export const Newsroom = ({ database }: Props) => {
  const news = database.results.map((result) => (
    <NewsPreview key={result.id} news={result as NewsType} />
  ));

  usePageTracking("visit_newsroom");

  return (
    <PageContainer>
      <SEO title="Newsroom" />
      <ContentList>{news}</ContentList>
    </PageContainer>
  );
};

const ContentList = styled("section", {
  marginTop: 40,

  [mq("sm")]: {
    marginTop: 20,
  },
});
