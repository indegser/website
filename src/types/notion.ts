import {
  ListBlockChildrenResponse,
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { notion } from '@src/sdks/notion';

export type PageType<T = PageObjectResponse['properties']> = Omit<
  PageObjectResponse,
  'properties'
> & {
  properties: T;
};

export type DatabaseType<T = PageObjectResponse> = Omit<
  QueryDatabaseResponse,
  'results'
> & {
  results: Array<T>;
};

export type CoverType = PageType['cover'];
type AllPropertyType = PageType['properties'][string];
export type PropertyType<T extends AllPropertyType['type']> = Extract<
  AllPropertyType,
  { type: T }
>;

export type ContentType = PageType<{
  _book: PropertyType<'relation'>;
  Title: PropertyType<'title'>;
  Quote: PropertyType<'formula'>;
  Subjects: PropertyType<'rollup'>;
  Description: PropertyType<'rich_text'>;
}>;

export type BlockChildrenType = Awaited<
  ReturnType<(typeof notion)['blocks']['children']['list']>
>['results'];

export type ListBlockChildrenType = Omit<
  ListBlockChildrenResponse,
  'results'
> & {
  results: BlockType[];
};

export type BlockType = Extract<BlockChildrenType[number], { type: string }> & {
  children?: BlockType[];
};

export type RichTextType = PropertyType<'title'>['title'][number];
export type RichTextItemResponse = Array<RichTextType>;
export type AnnotationType = RichTextType['annotations'];
export type AnnotationColorType = AnnotationType['color'];
