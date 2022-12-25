import { useQuery } from "@tanstack/react-query";

import { sanity } from "@src/sdks/sanity";
import { BookType } from "@src/types/cms";

export const useBookListQuery = () => {
  return useQuery(["bookList"], () => {
    return sanity.fetch<Array<BookType>>(`
      *[_type == 'book'] {
        _id,
        title,
        "posterUrl": poster.asset->url
      }    
    `);
  });
};

export const useJournalListQuery = () => {
  return useQuery(["journalList"], () => {
    return sanity.fetch(`
      *[_type == 'journal'] {
        _id,
        title,
        content
      }
    `);
  });
};
