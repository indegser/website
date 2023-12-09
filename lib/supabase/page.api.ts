import 'server-only';

import { INDEGSER_DATABASE_ID, isProduction } from 'lib/constants';
import { supabase } from 'lib/supabase';
import { syncApi } from '../utils/sync';

const getPage = async (page_id: string) => {
  syncApi.syncPage(page_id);
  return supabase.from('pages').select().eq('id', page_id).single();
};

type QueryPagesProps = {
  database_id?: string;
  limit?: number;
};

const queryPages = async ({
  limit = 100,
  database_id = INDEGSER_DATABASE_ID,
}: QueryPagesProps = {}) => {
  await syncApi.syncDatabase(database_id);

  let query = supabase
    .from('pages')
    .select('*, series(*)')
    .eq('database_id', database_id)
    .order('created_time', { ascending: false })
    .limit(limit);

  if (isProduction) {
    query = query.filter('is_draft', 'is', false);
  }

  return query;
};

export const pageApi = {
  getPage,
  queryPages,
};
