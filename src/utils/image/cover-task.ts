import { uploadImageToSupabase } from './upload';
import { notionUtils } from '../notion';

import { CDN_ORIGIN } from '@src/types/const.types';
import { PageType } from '@src/types/notion.types';
import { notion } from 'lib/notion';

export const coverTask = (pages: Array<PageType>) => {
  return pages.map(async (page) => {
    const coverUrl = notionUtils.getNotionFileUrl(page.cover);
    const shouldReplace = coverUrl && !coverUrl.includes(CDN_ORIGIN);

    if (!shouldReplace) return page;

    const newCoverUrl = await uploadImageToSupabase(coverUrl, 'cover');

    if (!newCoverUrl) return page;

    return notion.pages.update({
      page_id: page.id,
      cover: { external: { url: newCoverUrl.publicURL } },
    });
  });
};