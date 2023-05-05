import { ListBlockChildrenParameters } from '@notionhq/client/build/src/api-endpoints';

import { notion } from '@src/sdks/notion';
import {
  BlockType,
  CoverType,
  PageType,
  PropertyType,
} from '@src/types/notion';

const toString = (property: PropertyType<'formula'>) => {
  switch (property.formula.type) {
    case 'string':
      return property.formula.string;
    default:
      return '';
  }
};

const getBlock = async (id: string) => {
  const fetchNextPage = async (args: ListBlockChildrenParameters) => {
    const result = await notion.blocks.children.list(args);

    if (result.has_more) {
      const nextResult = await fetchNextPage({
        ...args,
        start_cursor: result.next_cursor || undefined,
      });
      result.results = [...result.results, ...nextResult.results];
    }

    return result;
  };

  return fetchNextPage({ block_id: id });
};

export const notionUtils = {
  toString,
  getBlock,
};

export const getNotionFileUrl = (
  coverOrFiles?: PropertyType<'files'> | CoverType
) => {
  if (!coverOrFiles) return null;

  if ('files' in coverOrFiles) {
    for (const file of coverOrFiles.files) {
      if (file.type === 'file') {
        return file.file.url;
      }

      return file.external.url;
    }
  } else {
    if (coverOrFiles.type === 'file') {
      return coverOrFiles.file.url;
    }

    return coverOrFiles.external.url;
  }
};

export const getNotionTitle = (
  titleProperty: Partial<PropertyType<'title'>>
) => {
  return titleProperty.title.map((text) => text.plain_text).join('');
};

export const getTitleFromPageProperties = (page: PageType) => {
  const key = Object.keys(page.properties).find(
    (key) => page.properties[key].type === 'title'
  );

  const prop = page.properties[key] as PropertyType<'title'>;
  return getNotionTitle(prop);
};

export const getNotionContent = async (blockId: string) => {
  const getBlocksWithChildren = async (blocks: BlockType[]) => {
    return await Promise.all(
      blocks.map(async (block) => {
        return await getBlockWithChildren(block);
      })
    );
  };
  const getBlockWithChildren = async (block: BlockType) => {
    if (block.has_children === true) {
      const result = await notion.blocks.children.list({
        block_id: block.id,
        page_size: 100,
      });

      /**
       * @todo has_more 체크
       */

      block['children'] = await getBlocksWithChildren(
        result.results as BlockType[]
      );
    }

    return block;
  };

  const children = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  return getBlocksWithChildren(children.results as BlockType[]);
};
