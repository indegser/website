import 'server-only';

import { INDEGSER_DATABASE_ID } from 'lib/constants';
import { notion } from 'lib/notion';
import { cache } from 'react';
import {
  ContentType,
  DatabaseType,
  ListBlockChildrenType,
} from './notion.types';

const retrievePage = cache(async (page_id: string) => {
  return notion.pages.retrieve({
    auth: process.env.NOTION_KEY,
    page_id,
  }) as Promise<ContentType>;
});

const retrieveBlockChildren = cache(
  async (block_id: string): Promise<ListBlockChildrenType['results']> => {
    const response = (await notion.blocks.children.list({
      auth: process.env.NOTION_KEY,
      block_id,
      page_size: 100,
    })) as ListBlockChildrenType;

    if (response.has_more) {
      const results = await retrieveBlockChildren(response.next_cursor!);
      return response.results.concat(results);
    }

    return response.results;
  },
);

type QueryDatabaseProps = {
  database_id?: string;
  limit?: number;
  start_cursor?: string;
};

const queryDatabase = cache(
  async ({
    limit: page_size = 50,
    start_cursor,
    database_id = INDEGSER_DATABASE_ID,
  }: QueryDatabaseProps = {}) => {
    return notion.databases.query({
      database_id,
      auth: process.env.NOTION_KEY,
      page_size,
      start_cursor,
      sorts: [
        {
          timestamp: 'last_edited_time',
          direction: 'descending',
        },
      ],
    }) as Promise<DatabaseType<ContentType>>;
  },
);

export const notionApi = {
  queryDatabase,
  retrieveBlockChildren,
  retrievePage,
};
