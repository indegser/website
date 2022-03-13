import { notion } from "@src/sdks/notion";

export type DatabaseResponseType = Awaited<
  ReturnType<typeof notion["databases"]["query"]>
>;

export type DatabasePageType = Extract<
  DatabaseResponseType["results"][number],
  { properties: Record<string, any> }
>;

export type PropertyType = DatabasePageType["properties"][string];
export type TitlePropertyType = Extract<PropertyType, { type: "title" }>;
export type DatePropertyType = Extract<PropertyType, { type: "date" }>;
export type SelectPropertyType = Extract<PropertyType, { type: "select" }>;

export type NewsPropertyType = {
  title: TitlePropertyType;
  status: SelectPropertyType;
  published_time: DatePropertyType;
  category: Extract<PropertyType, { type: "multi_select" }>;
  excerpt: Extract<PropertyType, { type: "rich_text" }>;
};

export type NewsType = DatabasePageType & {
  properties: NewsPropertyType;
};

export type BlockChildrenType = Awaited<
  ReturnType<typeof notion["blocks"]["children"]["list"]>
>;

export type BlockType = Extract<
  BlockChildrenType["results"][number],
  { type: string }
>;

export type RichTextType = TitlePropertyType["title"][number];
export type RichTextItemResponse = Array<RichTextType>;
export type AnnotationType = RichTextType["annotations"];
export type AnnotationColorType = AnnotationType["color"];
