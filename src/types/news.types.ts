import {
  DatabaseType,
  PageType,
  PropertyType,
  RelationPropertyType,
  SelectPropertyType,
  TitlePropertyType,
} from "./notion.types";

type NewsPropertiesType = {
  title: TitlePropertyType;
  status: SelectPropertyType;
  excerpt: Extract<PropertyType, { type: "rich_text" }>;
  series: RelationPropertyType;
};

export type NewsPageType = PageType<NewsPropertiesType>;

export type NewsDatabaseType = DatabaseType<NewsPageType>;
