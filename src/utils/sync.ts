import dayjs from 'dayjs';

import { coverTask } from './image/coverTask';
import { notionUtils } from './notion';

import { notionApi } from '@src/apis/notion';
import { notion } from '@src/sdks/notion';
import { supabase } from '@src/sdks/supabase';
import { PageType, PropertyType } from '@src/types/notion.types';

const syncPages = async (pages: PageType[]) => {
  const results = await Promise.all(coverTask(pages));
  const values = await Promise.all(
    results.map(async (page: PageType) => {
      const { id } = page;

      const title = notionUtils.getTitle(page);
      const cover = notionUtils.getNotionFileUrl(page.cover);

      const { results: content } = await notionApi.retrieveBlockChildren({
        block_id: id,
        page_size: 100,
      });

      const status = page.properties.Status as PropertyType<'status'>;
      const isDraft = status.status.name !== 'Done';

      return {
        id: page.id,
        title,
        cover,
        excerpt: notionUtils.getPlainText(
          page.properties.Description as PropertyType<'rich_text'>
        ),
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        content,
        is_draft: isDraft,
      };
    })
  );

  return supabase
    .from('pages')
    .upsert(values)
    .select(
      'id, title, cover, is_draft, excerpt, created_time, last_edited_time'
    );
};

const syncPage = async (id: string) => {
  const page = await notionApi.retrievePage<PageType>({ page_id: id });
  return syncPages([page]);
};

const syncLatest = async () => {
  const { results } = await notion.databases.query({
    database_id: '82649fda5ba84801a464d7ef2f7552b3',
    page_size: 100,
    sorts: [
      {
        timestamp: 'last_edited_time',
        direction: 'descending',
      },
    ],
    filter: {
      timestamp: 'last_edited_time',
      last_edited_time: {
        on_or_after: dayjs().subtract(7, 'day').toISOString(),
      },
    },
  });

  return syncApi.syncPages(results as PageType[]);
};

export const syncApi = {
  syncPage,
  syncPages,
  syncLatest,
};
