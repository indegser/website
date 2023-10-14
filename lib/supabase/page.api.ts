import 'server-only';

import { cache } from 'react';

import { isProduction } from 'lib/constants';
import { supabase } from 'lib/supabase';

const getPage = async (page_id: string) => {
  return supabase.from('pages').select().eq('id', page_id).single();
};

type QueryPagesProps = {
  limit?: number;
};

const queryPages = cache(async ({ limit = 100 }: QueryPagesProps = {}) => {
  // syncApi.syncLatest();

  let query = supabase
    .from('pages')
    .select('*, series(*)')
    .order('created_time', { ascending: false })
    .limit(limit);

  if (isProduction) {
    query = query.filter('is_draft', 'is', false);
  }

  return query;
});

export const pageApi = {
  getPage,
  queryPages,
};
