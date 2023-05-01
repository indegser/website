import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

import { notionApi } from './notion';

import { supabase } from '@src/sdks/supabase';
import { isProduction } from '@src/types/env';
import { BlockType, JournalPageType } from '@src/types/notion';

const queryJournalDatabase = (
  args: Omit<QueryDatabaseParameters, 'database_id'>
) => {
  return notionApi.queryDatabase<JournalPageType>({
    database_id: '82649fda5ba84801a464d7ef2f7552b3',
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    filter: isProduction
      ? {
          property: 'Status',
          status: {
            equals: 'Done',
          },
        }
      : undefined,
    ...args,
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
  queryJournalDatabase,
  fetchJournalBlocks,
  fetchJournal,
};
