import { useQueries, useQuery } from '@tanstack/react-query';

import { journalApi } from '@src/apis/journal';
import { supabase } from '@src/sdks/supabase';
import { BlockType, JournalPageType } from '@src/types/notion';

export const useJournalQueries = (journalIds: string[] = []) => {
  return useQueries({
    queries: journalIds.map((id) => {
      return {
        queryKey: ['journal', id],
        queryFn: async () =>
          supabase
            .from('pages')
            .select<'data', { data: { results: BlockType[] } }>('data')
            .eq('id', id)
            .single()
            .then((result) => result.data.data),
      };
    }),
  });
};
