import { supabase } from '@src/sdks/supabase';
import { BlockType, JournalPageType } from '@src/types/notion';

type FetchJournalListParameters = {
  offset?: number;
  pageSize?: number;
};

const fetchJournalList = async ({
  offset = 0,
  pageSize = 20,
}: FetchJournalListParameters) => {
  return supabase
    .from('journal')
    .select('data')
    .order('last_edited_time', { ascending: false })
    .range(offset, offset + pageSize)
    .then((result) => {
      const hasMore = result.data.length > pageSize;
      return {
        nextOffset: hasMore ? offset + pageSize : undefined,
        data: result.data
          .slice(0, pageSize)
          .map((item) => item.data as JournalPageType),
      };
    });
};

const fetchJournalBlocks = async (id: string) =>
  supabase
    .from('pages')
    .select<'data', { data: { results: BlockType[] } }>('data')
    .eq('id', id)
    .single()
    .then((result) => result.data.data.results);

const fetchJournal = async (id: string) =>
  supabase
    .from('journal')
    .select<'data', { data: JournalPageType }>('data')
    .eq('id', id)
    .single()
    .then((result) => result.data.data);

export const journalApi = {
  fetchJournalList,
  fetchJournalBlocks,
  fetchJournal,
};
