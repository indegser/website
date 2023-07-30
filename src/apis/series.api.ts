import 'server-only';

import { cache } from 'react';

import { supabase } from '@src/sdks/supabase';

const getSeries = cache(async (id: string) => {
  return supabase.from('series').select().eq('id', id).maybeSingle();
});

const getAllSeries = cache(() => {
  return supabase
    .from('series')
    .select()
    .order('last_edited_time', { ascending: false });
});

const getSeriesEpisodes = cache(async (id: string) => {
  const ids = await supabase
    .from('episodes')
    .select('id:page_id')
    .eq('series_id', id);

  return supabase
    .from('pages')
    .select('*, series(*)')
    .in(
      'id',
      ids.data.map((item) => item.id),
    );
});

export const seriesApi = {
  getSeries,
  getAllSeries,
  getSeriesEpisodes,
};
