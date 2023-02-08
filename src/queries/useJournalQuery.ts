import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { journalApi } from '@src/apis/journal';
import { BlockType, JournalPageType } from '@src/types/notion';

export const useJournalQuery = (id: string) => {
  return useQuery(createJournalQueryConfig(id));
};

export const createJournalQueryConfig = (
  id: string
): UseQueryOptions<{ journal: JournalPageType; blocks: BlockType[] }> => ({
  queryKey: ['journal', id],
  queryFn: async () => {
    const [journal, blocks] = await Promise.all([
      journalApi.fetchJournal(id),
      journalApi.fetchJournalBlocks(id),
    ]);
    return { journal, blocks };
  },
});
