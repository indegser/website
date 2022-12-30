import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { notion } from "@src/sdks/notion";

export type PageType<T = PageObjectResponse["properties"]> = Omit<
  PageObjectResponse,
  "properties"
> & {
  properties: T;
};

export type DatabaseType<T = PageObjectResponse> = Omit<
  QueryDatabaseResponse,
  "results"
> & {
  results: Array<T>;
};

export type CoverType = PageType["cover"];
type AllPropertyType = PageType["properties"][string];
export type PropertyType<T extends AllPropertyType["type"]> = Extract<
  AllPropertyType,
  { type: T }
>;

export type JournalPageType = PageType<{
  _book: PropertyType<"relation">;
  Title: PropertyType<"title">;
  Quote: PropertyType<"formula">;
}>;

export type BlockChildrenType = Awaited<
  ReturnType<typeof notion["blocks"]["children"]["list"]>
>;

export type BlockType = Extract<
  BlockChildrenType["results"][number],
  { type: string }
> & {
  children?: BlockType[];
};

export type RichTextType = PropertyType<"title">["title"][number];
export type RichTextItemResponse = Array<RichTextType>;
export type AnnotationType = RichTextType["annotations"];
export type AnnotationColorType = AnnotationType["color"];
