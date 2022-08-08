import { RichTextItemResponse } from "./notion.types";

export type ContentMetaType = {
  title: string;
  description?: string;
  image?: string;
};

export type ContentHeadlineType = {
  lastEditedTime: string;
  category: string;
  titleRichText: RichTextItemResponse[];
};
