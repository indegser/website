import {
  DatabasePageType,
  DatabaseType,
  DatePropertyType,
  FilesPropertyType,
  PropertyType,
  SelectPropertyType,
  TitlePropertyType,
} from "./notion.types";

type NewsPropertiesType = {
  title: TitlePropertyType;
  status: SelectPropertyType;
  cover?: FilesPropertyType;
  published_time: DatePropertyType;
  category: Extract<PropertyType, { type: "multi_select" }>;
  excerpt: Extract<PropertyType, { type: "rich_text" }>;
};

export type NewsDatabaseType = DatabaseType<NewsType>;

export type NewsType = Omit<DatabasePageType, "properties"> & {
  properties: NewsPropertiesType;
};
