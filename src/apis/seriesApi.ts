import { notion } from "@src/sdks/notion";
import { SeriesDatabaseType, SeriesType } from "@src/types/series.types";
import { getNotionFileUrl, getNotionTitle } from "@src/utils/notion";

const getSeriesList = async () => {
  const response = (await notion.databases.query({
    database_id: "79f66a73436f4989aac1bc4af196599e",
  })) as SeriesDatabaseType;

  return response.results.reduce((res, item) => {
    res[item.id] = {
      id: item.id,
      name: getNotionTitle(item.properties.name),
      cover: getNotionFileUrl(item.cover),
    };

    return res;
  }, {} as Record<string, SeriesType>);
};

export const seriesApi = {
  getSeriesList,
};
