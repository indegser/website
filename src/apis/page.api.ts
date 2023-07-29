import { cache } from 'react';

import { supabase } from '@src/sdks/supabase';
import { isProduction } from '@src/types/env';

type QueryPagesProps = {
  limit?: number;
};

const queryPages = cache(async ({ limit = 100 }: QueryPagesProps = {}) => {
  let query = supabase
    .from('pages')
    .select('*')
    .order('created_time', { ascending: false })
    .limit(limit);

  if (isProduction) {
    query = query.filter('is_draft', 'is', false);
  }

  return query;
});

export const pageApi = {
  queryPages,
};
