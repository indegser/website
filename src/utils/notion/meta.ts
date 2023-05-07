import { getNotionFileUrl, notionUtils } from '../notion';

import { BlockType, JournalPageType } from '@src/types/notion';

const getCoverImageFromBlocks = (blocks: BlockType[]) => {
  const image = blocks.find(
    (block): block is Extract<BlockType, { type: 'image' }> =>
      block.type === 'image'
  );

  let imageUrl: string;

  if (image) {
    if (image.image['type'] === 'file') {
      imageUrl = image.image.file.url;
    } else {
      imageUrl = image.image.external.url;
    }
  }

  return imageUrl;
};

export const getMetaFromNotionPage = (
  page: JournalPageType,
  blocks: BlockType[]
) => {
  const {
    id,
    cover,
    properties: { Description },
  } = page;

  const image =
    getNotionFileUrl(cover) || getCoverImageFromBlocks(blocks) || '';

  return {
    id,
    title: notionUtils.getTitle(page),
    description: Description?.rich_text[0]?.plain_text ?? '',
    image,
    lastEditedTime: page.last_edited_time,
  };
};
