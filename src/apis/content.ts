import { cache } from 'react';

import { supabase } from '@src/sdks/supabase';
import { syncApi } from '@src/utils/sync';

const getPage = cache(async (page_id: string) => {
  syncApi.syncPage(page_id);

  const { data } = await supabase
    .from('pages')
    .select()
    .eq('id', page_id)
    .maybeSingle();

  return data;
});

export const pageApi = {
  getPage,
};
