import 'server-only';

import { cache } from 'react';

import { supabase } from '@src/sdks/supabase';

const getSeries = cache(async (id: string) => {
  return supabase.from('series').select().eq('id', id).maybeSingle();
});

export const seriesApi = {
  getSeries,
};
