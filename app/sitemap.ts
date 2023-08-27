import { MetadataRoute } from 'next';

import { pageApi } from '@src/apis/page.api';
import { ORIGIN } from 'lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await pageApi.queryPages({ limit: 100 });
  return data.map((page) => ({
    url: `${ORIGIN}/content/${page.id}`,
    lastModified: page.last_edited_time,
  }));
}
