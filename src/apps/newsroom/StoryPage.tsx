import { useIsAdmin } from "common/hooks/admin.hooks";
import { SEO } from "common/SEO";
import { StoryType } from "types/story.types";
import { NewsroomPage } from "./NewsroomPage";
import { useStorySEO } from "./StoryPage.hooks";

interface Props {
  story: StoryType;
}

export const StoryPage = ({ story }: Props) => {
  const isAdmin = useIsAdmin();
  const initialValue = JSON.parse(story.content);
  const seo = useStorySEO(story);

  return (
    <>
      <SEO title={seo.title} description={seo.description} ogType="article" />
      <NewsroomPage isReadOnly={!isAdmin} content={initialValue} />
    </>
  );
};
