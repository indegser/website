import { PageType, PropertyType } from "./notion";

export type BookPageType = PageType<{
  author: PropertyType<"rich_text">;
  Title: PropertyType<"title">;
}>;
