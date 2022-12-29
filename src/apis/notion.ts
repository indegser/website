import {
  BlockObjectResponse,
  ListBlockChildrenParameters,
  ListBlockChildrenResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const getDatabase = async <T = PageObjectResponse>(
  args: QueryDatabaseParameters
): Promise<Omit<QueryDatabaseResponse, "results"> & { results: Array<T> }> => {
  return fetch("/api/notion/database", {
    method: "POST",
    body: JSON.stringify({ args }),
  }).then((res) => res.json());
};

const getBlockChildren = async <T = BlockObjectResponse>(
  args: ListBlockChildrenParameters
): Promise<
  Omit<ListBlockChildrenResponse, "results"> & { results: Array<T> }
> => {
  return fetch("/api/notion/block", {
    method: "POST",
    body: JSON.stringify({ args }),
  }).then((res) => res.json());
};

export const notionApi = {
  getDatabase,
  getBlockChildren,
};
