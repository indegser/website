import { useQuery } from "@tanstack/react-query";

import { sanity } from "@src/sdks/sanity";
import { JournalType } from "@src/types/cms";

export const useJournalListQuery = () => {
  return useQuery(["journalList"], () => {
    return sanity.fetch<Array<JournalType>>(`
      *[_type == 'journal'] {
        _id,
        _createdAt,
        _updatedAt,
        title,
        content[] {
          ...,
          _type == 'image' => {
            ...,
            asset->
          }
        },
        book->{ title }
      }
    `);
  });
};
