import { useQuery } from "@tanstack/react-query";

import { sanity } from "@src/sdks/sanity";
import { BookType, JournalType } from "@src/types/cms";

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
    return sanity.fetch<Array<JournalType>>(`
      *[_type == 'journal'] {
        _id,
        _createdAt,
        _updatedAt,
        title,
        content,
        book->{ title }
      }
    `);
  });
};
