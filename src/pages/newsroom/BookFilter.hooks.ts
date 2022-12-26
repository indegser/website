import { useQuery } from "@tanstack/react-query";

import { sanity } from "@src/sdks/sanity";
import { BookType } from "@src/types/cms";

export const useBookListQuery = () => {
  return useQuery(["bookList"], () => {
    return sanity.fetch<Array<BookType>>(`
      *[_type == 'book'] {
        _id,
        title,
        "journalCount": count(*[_type=='journal' && references(^._id)]),
        "posterUrl": poster.asset->url
      }    
    `);
  });
};
