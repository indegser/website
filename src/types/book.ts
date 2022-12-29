import { PageType, RichTextPropertyType } from "./notion.types";

export type BookPageType = PageType<{
  author: RichTextPropertyType;
}>;
