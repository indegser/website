import { uploadImageToSupabase } from './uploadImageToSupabase';
import { notionUtils } from '../notion';

import { notion } from '@src/sdks/notion';
import { CDN_ORIGIN } from '@src/types/constants';
import { PageType } from '@src/types/notion.types';

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
