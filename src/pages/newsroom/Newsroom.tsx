import { NewsPreview } from "./NewsPreview";

import { PageContainer } from "@src/common/atoms/Container";
import { SEO } from "@src/common/SEO";
import { styled } from "@src/common/stitches.config";
import { mq } from "@src/common/theme";
import { DatabaseResponseType, NewsType } from "@src/types/notion.types";

interface Props {
  database: DatabaseResponseType;
}

export const Newsroom = ({ database }: Props) => {
  const news = database.results.map((result) => (
    <NewsPreview key={result.id} news={result as NewsType} />
  ));

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
