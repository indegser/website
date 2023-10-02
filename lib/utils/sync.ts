import 'server-only';

import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import uniqBy from 'lodash-es/uniqBy';

import { coverTask, coverTask2 } from './image/cover-task';
import { notionUtils } from './notion';

import { notion } from 'lib/notion';
import { supabase } from 'lib/supabase';
import { ContentType, PageType, PropertyType } from 'lib/supabase/notion.types';

const fetchContent = async (
  id: string,
  auth?: string,
): Promise<(PartialBlockObjectResponse | BlockObjectResponse)[]> => {
  const response = await notion.blocks.children.list({
    auth,
    block_id: id,
    page_size: 100,
  });

  if (response.has_more) {
    const results = await fetchContent(response.next_cursor, auth);
    return response.results.concat(results);
  }

  return response.results;
};

const convertPages = async (pages: ContentType[], auth: string) => {
  return Promise.all(
    pages.map(async (raw: PageType) => {
      const page = (await coverTask2(raw, auth)) as PageType;
      const { id } = page;

      const title = notionUtils.getTitle(page);
      const cover = notionUtils.getNotionFileUrl(page.cover);

      const content = await fetchContent(id, auth);

      const status = page.properties.Status as PropertyType<'status'>;
      const isDraft = status?.status.name !== 'Done';
      const database_id =
        page.parent.type === 'database_id' ? page.parent.database_id : null;

      return {
        id: page.id,
        database_id,
        title,
        cover,
        excerpt: page.properties.Description
          ? notionUtils.getPlainText(
              page.properties.Description as PropertyType<'rich_text'>,
            )
          : null,
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        content,
        is_draft: isDraft,
      };
    }),
  );
};

const syncPages = async (pages: ContentType[], auth?: string) => {
  const results = await Promise.all(coverTask(pages));

  const values = await Promise.all(
    results.map(async (page: PageType) => {
      const { id } = page;

      const title = notionUtils.getTitle(page);
      const cover = notionUtils.getNotionFileUrl(page.cover);

      const content = await fetchContent(id, auth);

      const status = page.properties.Status as PropertyType<'status'>;
      const isDraft = status.status.name !== 'Done';
      const database_id =
        page.parent.type === 'database_id' ? page.parent.database_id : null;

      return {
        id: page.id,
        database_id,
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

const syncPage = async (id: string, auth?: string) => {
  const page = await notion.pages.retrieve({ auth, page_id: id });
  return convertPages([page as ContentType], auth);
};

const syncDatabase = async (database_id: string, auth: string) => {
  const response = await notion.databases.query({
    database_id,
    auth,
    page_size: 100,
    sorts: [
      {
        timestamp: 'last_edited_time',
        direction: 'descending',
      },
    ],
  });

  const pages = await convertPages(response.results as ContentType[], auth);

  return supabase.from('pages').upsert(pages).select();
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
  // await supabase
  //   .from('pages')
  //   .delete()
  //   .not('id', 'in', `(${ids.join(',')})`);

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
  syncDatabase,
};