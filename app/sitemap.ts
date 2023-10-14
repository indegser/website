import { MetadataRoute } from 'next';

import { ORIGIN } from 'lib/constants';
import { pageApi } from 'lib/supabase/page.api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data, error } = await pageApi.queryPages({ limit: 100 });
  if (error) return [];

  return data.map((page) => ({
    url: `${ORIGIN}/content/${page.id}`,
    lastModified: page.last_edited_time,
  }));
}
