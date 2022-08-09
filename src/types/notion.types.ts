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
export type FilesPropertyType = Extract<PropertyType, { type: "files" }>;

export type NewsPropertyType = {
  title: TitlePropertyType;
  status: SelectPropertyType;
  cover?: FilesPropertyType;
  published_time: DatePropertyType;
  category: Extract<PropertyType, { type: "multi_select" }>;
  excerpt: Extract<PropertyType, { type: "rich_text" }>;
};

export type NewsType = Omit<DatabasePageType, "properties"> & {
  properties: NewsPropertyType;
};

export type BlockChildrenType = Awaited<
  ReturnType<typeof notion["blocks"]["children"]["list"]>
>;

export type BlockType = Extract<
  BlockChildrenType["results"][number],
  { type: string }
> & {
  children?: BlockType[];
};

export type RichTextType = TitlePropertyType["title"][number];
export type RichTextItemResponse = Array<RichTextType>;
export type AnnotationType = RichTextType["annotations"];
export type AnnotationColorType = AnnotationType["color"];
