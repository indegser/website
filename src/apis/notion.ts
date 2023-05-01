import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { isServer } from '@tanstack/react-query';

import { notion } from '@src/sdks/notion';
import { DatabaseType } from '@src/types/notion';

export const queryDatabase = <T>(
  args: QueryDatabaseParameters
): Promise<DatabaseType<T>> => {
  return isServer
    ? notion.databases.query(args)
    : fetch('/api/notion/database', {
        method: 'post',
        body: JSON.stringify(args),
      }).then((res) => res.json());
};

export const notionApi = { queryDatabase };
