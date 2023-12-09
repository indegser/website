import { notionUtils } from '../notion';

import { notion } from 'lib/notion';
import { PageType } from 'lib/supabase/notion.types';
import { uploadImage } from './create-image';

export const coverTask2 = async (page: PageType, auth?: string) => {
  const coverUrl = notionUtils.getNotionFileUrl(page.cover);
  if (!coverUrl) return page;

  const newCoverUrl = await uploadImage(coverUrl, 'covers');

  if (newCoverUrl !== coverUrl) {
    return notion.pages.update({
      auth,
      page_id: page.id,
      cover: { external: { url: newCoverUrl } },
    });
  } else {
    return page;
  }
};
