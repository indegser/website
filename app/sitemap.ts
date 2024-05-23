import { notionApi } from '@/lib/supabase/notion.api';
import { getURL } from 'lib/constants';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { results } = await notionApi.queryDatabase();

  return results.map((page) => ({
    url: `${getURL()}/content/${page.id}`,
    lastModified: page.last_edited_time,
  }));
}
