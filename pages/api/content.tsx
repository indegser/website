import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { notionApi } from '@src/apis/notion';
import { notion } from '@src/sdks/notion';
import { supabase } from '@src/sdks/supabase';
import { PageType, PropertyType } from '@src/types/notion';
import { coverTask } from '@src/utils/image/coverTask';
import { getNotionFileUrl, notionUtils } from '@src/utils/notion';

const handler = async (req: NextApiRequest, res: NextApiResponse<{}>) => {
  const result = await notion.databases.query({
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

  const results = await Promise.all(
    coverTask(result.results as Array<PageType>)
  );

  const pages = await Promise.all(
    results.map(async (page: PageType) => {
      const { id } = page;

      const title = notionUtils.getTitle(page);
      const cover = getNotionFileUrl(page.cover);

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

  const updated = await supabase
    .from('pages')
    .upsert(pages)
    .select(
      'id, title, cover, is_draft, excerpt, created_time, last_edited_time'
    );

  res.json(updated);
};

export default handler;
