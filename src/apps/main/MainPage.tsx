import { PageContainer } from "common/atoms/Container";
import { StoryRow } from "./StoryRow";
import { SEO } from "common/SEO";
import { CreateNew } from "./CreateNew";
import { useIsAdmin } from "common/hooks/admin.hooks";
import { styled } from "common/stitches.config";
import { mq } from "common/theme";
import { useNewsroomQuery } from "queries/useNewsroomQuery";

export const MainPage = () => {
  const { data: newsroom } = useNewsroomQuery();
  const isAdmin = useIsAdmin();

  return (
    <PageContainer>
      <SEO title="Newsroom" />
      <ContentList>
        {newsroom.map((news) => (
          <StoryRow key={news.id} news={news} />
        ))}
      </ContentList>
      {isAdmin && <CreateNew />}
    </PageContainer>
  );
};

const ContentList = styled("section", {
  marginTop: 40,

  [mq("sm")]: {
    marginTop: 20,
  },
});
