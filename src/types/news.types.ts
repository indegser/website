import {
  DatabaseType,
  PageType,
  RelationPropertyType,
  RichTextPropertyType,
  SelectPropertyType,
  TitlePropertyType,
} from "./notion.types";

type NewsPropertiesType = {
  title: TitlePropertyType;
  status: SelectPropertyType;
  excerpt: RichTextPropertyType;
  series: RelationPropertyType;
};

export type NewsPageType = PageType<NewsPropertiesType>;

export type NewsDatabaseType = DatabaseType<NewsPageType>;
