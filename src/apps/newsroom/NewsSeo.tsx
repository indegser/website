import { SEO } from "common/SEO";
import { useNewsQuery } from "queries/useNewsQuery";

export const NewsSeo = () => {
  const { data: news } = useNewsQuery();
  const { title, excerpt, cover_url } = news;

  return (
    <SEO
      title={title}
      description={excerpt}
      image={cover_url}
      ogType="article"
    />
  );
};
