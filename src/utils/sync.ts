import 'server-only';

import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import uniqBy from 'lodash-es/uniqBy';

import { coverTask } from './image/coverTask';
import { notionUtils } from './notion';

import { notion } from '@src/sdks/notion';
import { supabase } from '@src/sdks/supabase';
import { ContentType, PageType, PropertyType } from '@src/types/notion.types';

const fetchContent = async (
  id: string,
): Promise<(PartialBlockObjectResponse | BlockObjectResponse)[]> => {
  const response = await notion.blocks.children.list({
    block_id: id,
    page_size: 100,
  });

  if (response.has_more) {
    const results = await fetchContent(response.next_cursor);
    return response.results.concat(results);
  }

  return response.results;
};

const syncPages = async (pages: ContentType[]) => {
  const results = await Promise.all(coverTask(pages));

  const values = await Promise.all(
    results.map(async (page: PageType) => {
      const { id } = page;

      const title = notionUtils.getTitle(page);
      const cover = notionUtils.getNotionFileUrl(page.cover);

      const content = await fetchContent(id);

      const status = page.properties.Status as PropertyType<'status'>;
      const isDraft = status.status.name !== 'Done';

      return {
        id: page.id,
        title,
        cover,
        excerpt: notionUtils.getPlainText(
          page.properties.Description as PropertyType<'rich_text'>,
        ),
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        content,
        is_draft: isDraft,
      };
    }),
  );

  const result = await supabase
    .from('pages')
    .upsert(values)
    .select(
      'id, title, cover, is_draft, excerpt, created_time, last_edited_time',
    );

  await supabase.from('episodes').upsert(
    pages.flatMap((page) => {
      const series = page.properties.Series;

      return series.multi_select.map((option) => ({
        page_id: page.id,
        series_id: option.id,
      }));
    }),
  );

  return result;
};

const syncPage = async (id: string) => {
  const page = await notion.pages.retrieve({ page_id: id });
  return syncPages([page as ContentType]);
};

const syncLatest = async () => {
  const response = await notion.databases.query({
    database_id: '82649fda5ba84801a464d7ef2f7552b3',
    page_size: 100,
    sorts: [
      {
        timestamp: 'last_edited_time',
        direction: 'descending',
      },
    ],
  });

  const results = response.results as ContentType[];
  const ids = results.map((page) => page.id);

  const series = uniqBy(
    results.flatMap((result) => result.properties.Series.multi_select),
    (select) => select.id,
  );

  /**
   * 삭제된 페이지 정리
   */
  await supabase
    .from('pages')
    .delete()
    .not('id', 'in', `(${ids.join(',')})`);

  /**
   * 삭제된 시리즈 정리
   */
  await supabase
    .from('series')
    .delete()
    .not('id', 'in', `(${series.map((item) => item.id).join(',')})`);

  /**
   * 최신 시리즈 Upsert
   */
  await supabase.from('series').upsert(series);

  return syncApi.syncPages(results);
};

export const syncApi = {
  syncPage,
  syncPages,
  syncLatest,
};
