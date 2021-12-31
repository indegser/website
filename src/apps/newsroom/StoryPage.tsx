import { SEO } from "common/SEO";
import { StoryType } from "types/story.types";
import { Renderer } from "./Renderer";
import { useStorySEO } from "./StoryPage.hooks";

interface Props {
  story: StoryType;
}

export const StoryPage = ({ story }: Props) => {
  const initialValue = JSON.parse(story.content);
  const seo = useStorySEO(story);

  return (
    <>
      <SEO title={seo.title} description={seo.description} ogType="article" />
      <Renderer isReadOnly initialValue={initialValue} />
    </>
  );
};
