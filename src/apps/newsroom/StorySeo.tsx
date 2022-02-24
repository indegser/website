import { SEO } from "common/SEO";
import { useStoryQuery } from "./queries/useStoryQuery";
import { useStorySEO } from "./StorySeo.hooks";

export const StorySeo = () => {
  const { data } = useStoryQuery();
  const { title, description, ogImage } = useStorySEO(data);
  return (
    <SEO
      title={title}
      description={description}
      ogType="article"
      image={ogImage}
    />
  );
};
