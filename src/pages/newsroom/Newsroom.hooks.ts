import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { stringifyUrl } from "query-string";

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
