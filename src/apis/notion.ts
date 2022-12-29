import {
  ListBlockChildrenParameters,
  ListBlockChildrenResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const getDatabase = async (
  args: QueryDatabaseParameters
): Promise<QueryDatabaseResponse> => {
  return fetch("/api/notion/database", {
    method: "POST",
    body: JSON.stringify({ args }),
  }).then((res) => res.json());
};

const getBlockChildren = async (
  args: ListBlockChildrenParameters
): Promise<ListBlockChildrenResponse> => {
  return fetch("/api/notion/block", {
    method: "POST",
    body: JSON.stringify({ args }),
  }).then((res) => res.json());
};

export const notionApi = {
  getDatabase,
  getBlockChildren,
};
