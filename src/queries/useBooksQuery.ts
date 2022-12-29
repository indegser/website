import { useQuery } from "@tanstack/react-query";

import { notionApi } from "@src/apis/notion";
import { BookPageType } from "@src/types/book";

export const useBooksQuery = () => {
  return useQuery(["books"], async () => {
    const { results } = await notionApi.getDatabase<BookPageType>({
      database_id: "6dc0fa57a6a54cad9242f6feefc22344",
      page_size: 100,
    });

    return results.reduce((res, item) => {
      res[item.id] = item;
      return res;
    }, {} as Record<string, BookPageType>);
  });
};
