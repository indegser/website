import { cache } from 'react';

import { notionApi } from './notion';

import { supabase } from '@src/sdks/supabase';
import { ContentType } from '@src/types/notion';

const pageJob = async (page_id: string) => {
  const page = await notionApi.retrievePage<ContentType>({ page_id });
  await supabase.from('pages').upsert({ id: page.id, data: page });
  return page;
};

const childrenJob = async (id: string) => {
  const result = await notionApi.retrieveBlockChildren({
    block_id: id,
    page_size: 100,
  });

  await supabase
    .from('pages')
    .upsert({ id, children: result.results }, { onConflict: 'id' })
    .then((x) => {
      console.log(x.error, 'x');
    });
  return result;
};

const getPage = cache(async (page_id: string) => {
  const { data } = await supabase
    .from('pages')
    .select('data')
    .eq('id', page_id)
    .maybeSingle();

  if (!data) {
    return pageJob(page_id);
  } else {
    pageJob(page_id);
    return data.data as ContentType;
  }
});

const getContent = cache(async (id: string) => {
  const { data } = await supabase
    .from('pages')
    .select('children')
    .eq('id', id)
    .maybeSingle();

  if (!data?.children) {
    return childrenJob(id);
  } else {
    childrenJob(id);
    return { results: data.children };
  }
});

export const pageApi = {
  getPage,
  getContent,
};
