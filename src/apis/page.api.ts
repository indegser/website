import 'server-only';

import { cache } from 'react';

import { isProduction } from '@src/types/env.types';
import { syncApi } from '@src/utils/sync';
import { supabase } from 'lib/supabase';

const getPage = cache(async (page_id: string) => {
  await syncApi.syncPage(page_id);

  const { data } = await supabase
    .from('pages')
    .select()
    .eq('id', page_id)
    .maybeSingle();

  return data;
});

type QueryPagesProps = {
  limit?: number;
};

const queryPages = cache(async ({ limit = 100 }: QueryPagesProps = {}) => {
  syncApi.syncLatest();

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
