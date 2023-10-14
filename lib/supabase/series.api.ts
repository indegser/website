import 'server-only';

import { cache } from 'react';

import { supabase } from 'lib/supabase';

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
  const { data, error } = await supabase
    .from('episodes')
    .select('id:page_id')
    .eq('series_id', id);

  if (error) return;

  return supabase
    .from('pages')
    .select('*, series(*)')
    .in(
      'id',
      data.map((item) => item.id),
    );
});

export const seriesApi = {
  getSeries,
  getAllSeries,
  getSeriesEpisodes,
};
