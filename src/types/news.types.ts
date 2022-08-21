import {
  DatabaseType,
  DatePropertyType,
  FilesPropertyType,
  PageType,
  PropertyType,
  RelationPropertyType,
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
  series: RelationPropertyType;
};

export type NewsPageType = PageType<NewsPropertiesType>;

export type NewsDatabaseType = DatabaseType<NewsPageType>;
