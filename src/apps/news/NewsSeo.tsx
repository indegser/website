import { SEO } from "common/SEO";
import { useNewsQuery } from "queries/useNewsQuery";
import { useNewsMeta } from "./NewsSeo.hooks";

export const NewsSeo = () => {
  const { data: news } = useNewsQuery();
  const { extractNewsMeta } = useNewsMeta();
  const { title, excerpt, cover_url } = extractNewsMeta(
    JSON.parse(news.content)
  );

  return (
    <SEO
      title={title ?? "제목없음"}
      description={excerpt}
      image={cover_url}
      ogType="article"
    />
  );
};
