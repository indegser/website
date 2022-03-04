import { PageContainer } from "common/atoms/Container";
import { NewsPreview } from "./NewsPreview";
import { SEO } from "common/SEO";
import { CreateNews } from "./CreateNews";
import { useIsAdmin } from "common/hooks/admin.hooks";
import { styled } from "common/stitches.config";
import { mq } from "common/theme";
import { useNewsroomQuery } from "queries/useNewsroomQuery";

export const NewsroomPage = () => {
  const { data: newsroom } = useNewsroomQuery();
  const isAdmin = useIsAdmin();

  return (
    <PageContainer>
      <SEO title="Newsroom" />
      <ContentList>
        {newsroom.map((news) => (
          <NewsPreview key={news.id} news={news} />
        ))}
      </ContentList>
      {isAdmin && <CreateNews />}
    </PageContainer>
  );
};

const ContentList = styled("section", {
  marginTop: 40,

  [mq("sm")]: {
    marginTop: 20,
  },
});
