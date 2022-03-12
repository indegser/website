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
};

export type NewsType = DatabasePageType & {
  properties: NewsPropertyType;
};

export type RichText = TitlePropertyType["title"][number];
export type RichTextItemResponse = Array<RichText>;
