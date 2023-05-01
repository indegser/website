import { NextApiRequest, NextApiResponse } from 'next';

import { notion } from '@src/sdks/notion';
import { supabase } from '@src/sdks/supabase';
import { JournalPageType } from '@src/types/notion';
import { uploadImageToSupabase } from '@src/utils/image/uploadImageToSupabase';
import { getNotionFileUrl, notionUtils } from '@src/utils/notion';

const coverTask = (pages: Array<JournalPageType>) => {
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
  }) as Array<Promise<JournalPageType>>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { results } = (await notion.databases.query({
    database_id: '82649fda5ba84801a464d7ef2f7552b3',
    page_size: 100,
    filter: {
      property: '_status',
      select: {
        equals: 'Production',
      },
    },
  })) as unknown as { results: JournalPageType[] };

  const updatedResults = await Promise.all(coverTask(results));

  await supabase
    .from('journal')
    .delete()
    .not(
      'id',
      'in',
      `(${updatedResults.map((result) => result.id).join(',')})`
    );

  const values = updatedResults.map((result) => {
    const payload = {
      id: result.id,
      data: result,
      created_time: result.created_time,
      last_edited_time: result.last_edited_time,
    };

    return payload;
  });

  const promises = values.map(async (value) => {
    const data = await notionUtils.getBlock(value.id);
    return {
      id: value.id,
      data,
    };
  });

  const pages = await Promise.all(promises);
  await supabase.from('pages').upsert(pages);
  await supabase.from('journal').upsert(values);

  res.end();
}
