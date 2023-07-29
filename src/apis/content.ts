import { cache } from 'react';

import { supabase } from '@src/sdks/supabase';

const getPage = cache(async (page_id: string) => {
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
