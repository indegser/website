import 'server-only';

import { cache } from 'react';

import { isProduction } from 'lib/constants';
import { supabase } from 'lib/supabase';
import { syncApi } from 'lib/utils/sync';

const getPage = cache(async (page_id: string) => {
  const { data } = await supabase
    .from('pages')
    .select(
      `
    *,
    database: databases ( token )
  `,
    )
    .eq('id', page_id)
    .maybeSingle();

  await syncApi.syncPage(page_id, data?.database.token);

  const { data: result } = await supabase
    .from('pages')
    .select()
    .eq('id', page_id)
    .maybeSingle();

  return result;
});

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
