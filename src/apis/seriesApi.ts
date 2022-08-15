import { notion } from "@src/sdks/notion";

const getSeriesList = () => {
  return notion.databases.query({
    database_id: "79f66a73436f4989aac1bc4af196599e",
    sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
  });
};

const getSeries = (seriesId: string) => {
  return notion.pages.retrieve({
    page_id: seriesId,
  });
};

export const seriesApi = {
  getSeriesList,
  getSeries,
};
