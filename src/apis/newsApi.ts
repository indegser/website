import { notion } from "@src/sdks/notion";

const getNewsDatabase = () => {
  return notion.databases.query({
    database_id: "0021f4b0494546a596716a7a5d9db452",
    sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
  });
};

export const newsApi = {
  getNewsDatabase,
};
