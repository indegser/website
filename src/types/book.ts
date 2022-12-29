import { PageType, RichTextPropertyType } from "./notion";

export type BookPageType = PageType<{
  author: RichTextPropertyType;
}>;
