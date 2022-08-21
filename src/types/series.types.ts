import {
  DatabasePageType,
  DatabaseType,
  FilesPropertyType,
  TitlePropertyType,
} from "./notion.types";

export type SeriesType = {
  id: string;
  name: string;
  cover: string;
};

type SeriesPropertiesType = {
  name: TitlePropertyType;
  cover: FilesPropertyType;
};

export type SeriesPageType = Omit<DatabasePageType, "properties"> & {
  properties: SeriesPropertiesType;
};

export type SeriesDatabaseType = DatabaseType<SeriesPageType>;
