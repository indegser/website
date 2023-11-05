import 'server-only';

import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { coverTask2 } from './image/cover-task';
import { notionUtils } from './notion';

import { notion } from 'lib/notion';
import { Tables, supabase } from 'lib/supabase';
import { ContentType, PageType, PropertyType } from 'lib/supabase/notion.types';
import { createSupabase } from '../supabase/create-supabase';

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
    const results = await fetchContent(response.next_cursor!, auth);
    return response.results.concat(results);
  }

  return response.results;
};

const convertPages = async (pages: ContentType[], auth?: string) => {
  const results = await Promise.all(
    pages.map(async (raw: PageType) => {
      const database_id =
        raw.parent.type === 'database_id' ? raw.parent.database_id : null;

      if (database_id === null) {
        return;
      }

      const page = (await coverTask2(raw, auth)) as PageType;
      const { id } = page;

      const title = notionUtils.getTitle(page);
      const cover = notionUtils.getNotionFileUrl(page.cover);

      const content = await fetchContent(id, auth);

      const status = page.properties.Status as PropertyType<'status'>;
      const isDraft = status?.status?.name !== 'Done';

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
  return results.filter((page): page is Tables<'pages'> => true);
};

const syncPage = async (id: string) => {
  const supabase = createSupabase();

  const { data } = await supabase.from('tokens').select().maybeSingle();
  const auth = data?.token;
  const page = await notion.pages.retrieve({ auth, page_id: id });
  const pages = await convertPages([page as ContentType], auth!);
  return supabase.from('pages').upsert(pages).select();
};

const syncDatabase = async (database_id: string, auth?: string) => {
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

export const syncApi = {
  syncPage,
  syncDatabase,
};
