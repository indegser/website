import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { stringifyUrl } from "query-string";

import { sanity } from "@src/sdks/sanity";
import { BookType } from "@src/types/cms.types";
import { NewsDatabaseType } from "@src/types/news.types";

export const useNewsroomQuery = () => {
  const { query, isReady } = useRouter();
  const series = query.series?.toString();

  return useQuery(
    ["newsroom", series],
    () =>
      fetch(stringifyUrl({ url: `/api/newsroom`, query: { series } }))
        .then((res) => res.json())
        .then((data) => data as NewsDatabaseType),
    { enabled: isReady }
  );
};

export const useBooksQuery = () => {
  return useQuery(["book"], () => {
    return sanity.fetch<Array<BookType>>(`
      *[_type == 'book'] {
        _id,
        title,
        "posterUrl": poster.asset->url
      }    
    `);
  });
};
