import { notionUtils } from '../notion';
import { uploadImageToSupabase } from './upload';

import { CDN_ORIGIN } from 'lib/constants';
import { notion } from 'lib/notion';
import { PageType } from 'lib/supabase/notion.types';

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

export const coverTask2 = async (page: PageType, auth?: string) => {
  const coverUrl = notionUtils.getNotionFileUrl(page.cover);
  const shouldReplace = coverUrl && !coverUrl.includes(CDN_ORIGIN);

  if (!shouldReplace) return page;

  const newCoverUrl = await uploadImageToSupabase(coverUrl, 'cover');

  if (!newCoverUrl) return page;

  return notion.pages.update({
    auth,
    page_id: page.id,
    cover: { external: { url: newCoverUrl.publicURL } },
  });
};
