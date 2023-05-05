import { uploadImageToSupabase } from './uploadImageToSupabase';
import { getNotionFileUrl } from '../notion';

import { notion } from '@src/sdks/notion';
import { PageType } from '@src/types/notion';

export const coverTask = (pages: Array<PageType>) => {
  return pages.map(async (page) => {
    const coverUrl = getNotionFileUrl(page.cover);
    const shouldReplace =
      coverUrl && !coverUrl.includes(process.env.NEXT_PUBLIC_SUPABASE_URL);

    if (!shouldReplace) return page;

    const newCoverUrl = await uploadImageToSupabase(coverUrl, 'cover');

    if (!newCoverUrl) return page;

    return notion.pages.update({
      page_id: page.id,
      cover: { external: { url: newCoverUrl.publicURL } },
    });
  });
};
