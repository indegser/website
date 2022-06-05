import { notion } from "@src/sdks/notion";
import { environment } from "@src/types/env.types";

const getNewsDatabase = () => {
  return notion.databases.query({
    database_id: "0021f4b0494546a596716a7a5d9db452",
    sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
    filter: {
      or: [
        environment === "production" && {
          property: "status",
          select: {
            equals: "Production",
          },
        },
      ].filter(Boolean),
    },
  });
};

const retrieveNewsroom = () => {
  return notion.databases.retrieve({
    database_id: "0021f4b0494546a596716a7a5d9db452",
  });
};

export const newsApi = {
  getNewsDatabase,
  retrieveNewsroom,
};
