import { isFullBlock } from '@notionhq/client';
import {
  DatabaseObjectResponse,
  GetDatabaseParameters,
  GetPageParameters,
  ListBlockChildrenParameters,
  ListBlockChildrenResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';

import { notion } from '@src/sdks/notion';
import { isServer } from '@src/types/env';
import { DatabaseType, ListBlockChildrenType } from '@src/types/notion.types';
import { coverTask } from '@src/utils/image/coverTask';

export const queryDatabase = async <T>(
  args: QueryDatabaseParameters
): Promise<DatabaseType<T>> => {
  const result = await (isServer
    ? notion.databases.query(args)
    : fetch('/api/notion/database', {
        method: 'post',
        body: JSON.stringify(args),
      }).then((res) => res.json()));

  if (isServer) {
    result.results = await Promise.all(coverTask(result.results));
  }

  return result;
};

export const retrieveDatabase = (
  args: GetDatabaseParameters
): Promise<DatabaseObjectResponse> => {
  return isServer
    ? notion.databases.retrieve(args)
    : fetch('/api/notion', {
        method: 'post',
        body: JSON.stringify(args),
      }).then((res) => res.json());
};

export const retrievePage = <T>(args: GetPageParameters): Promise<T> => {
  return isServer
    ? notion.pages.retrieve(args)
    : fetch('/api/notion/page', {
        method: 'post',
        body: JSON.stringify(args),
      }).then((res) => res.json());
};

export const retrieveBlockChildren = async (
  args: ListBlockChildrenParameters
): Promise<ListBlockChildrenType> => {
  const response = (
    isServer
      ? await notion.blocks.children.list(args)
      : await fetch('/api/notion/blocks', {
          method: 'post',
          body: JSON.stringify(args),
        }).then((res) => res.json())
  ) as ListBlockChildrenResponse;

  return {
    ...response,
    results: response.results.filter(isFullBlock),
  };
};

export const notionApi = {
  queryDatabase,
  retrieveDatabase,
  retrievePage,
  retrieveBlockChildren,
};
