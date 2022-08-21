import {
  DatabaseType,
  FilesPropertyType,
  PageType,
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

export type SeriesPageType = PageType<SeriesPropertiesType>;

export type SeriesDatabaseType = DatabaseType<SeriesPageType>;
