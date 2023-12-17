import 'server-only';

import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { replaceNotionCover } from './image/cover-task';
import { notionUtils } from './notion';

import { notion } from 'lib/notion';
import { Tables, supabase } from 'lib/supabase';
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

      const page = (await replaceNotionCover(raw, auth)) as PageType;

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

const getAuthFromUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('tokens')
    .select('token')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data.token;
};

const syncPage = async (id: string) => {
  const { data } = await supabase
    .from('pages')
    .select('last_edited_time, author:databases(user_id)')
    .eq('id', id)
    .single()
    .throwOnError();

  if (!data) return;
  const userId = data.author?.user_id;

  if (!userId) return;

  const auth = await getAuthFromUserId(userId);

  try {
    const page = await notion.pages.retrieve({ auth, page_id: id });
    const pages = await convertPages([page as ContentType], auth!);
    return supabase.from('pages').upsert(pages).select();
  } catch (err) {
    await supabase.from('pages').delete().eq('id', id);
    throw err;
  }
};

const syncDatabase = async (
  database_id: string,
  auth: string = process.env.NOTION_KEY,
) => {
  const { data, error } = await supabase
    .from('databases')
    .select()
    .eq('id', database_id)
    .single();

  if (error) {
    throw error;
  }

  const lastSyncedAt = data.last_synced_at;

  const { results } = await notion.databases.query({
    database_id,
    auth,
    page_size: 30,
    sorts: [
      {
        timestamp: 'last_edited_time',
        direction: 'descending',
      },
    ],
    filter: lastSyncedAt
      ? {
          timestamp: 'last_edited_time',
          last_edited_time: {
            on_or_after: lastSyncedAt!,
          },
        }
      : undefined,
  });

  if (results.length === 0) return;

  const pages = await convertPages(results as ContentType[], auth);
  await supabase.from('pages').upsert(pages).select();
  await supabase
    .from('databases')
    .update({ last_synced_at: new Date().toISOString() })
    .eq('id', database_id);
};

export const syncApi = {
  syncPage,
  syncDatabase,
};
