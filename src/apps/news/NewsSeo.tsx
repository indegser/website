import { useNewsMeta } from "./NewsSeo.hooks";

import { SEO } from "@src/common/SEO";
import { useNewsQuery } from "@src/queries/useNewsQuery";

export const NewsSeo = () => {
  const { data: news } = useNewsQuery();
  const { extractNewsMeta } = useNewsMeta();
  const { title, excerpt, cover_url } = extractNewsMeta(
    news.content ? JSON.parse(news.content) : []
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
