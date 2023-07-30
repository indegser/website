import 'server-only';

import ogs from 'open-graph-scraper';

import { supabase } from '@src/sdks/supabase';

const parseUrl = (originalUrl: string, url: string) => {
  if (!url) return null;
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  if (url.startsWith('/')) {
    return new URL(originalUrl).origin + url;
  }

  return url;
};

const hasCachedVersion = async (url: string) => {
  const { data } = await supabase
    .from('link_previews')
    .select()
    .eq('id', url)
    .maybeSingle();

  return data;
};

export const linkPreview = async (url: string) => {
  const cachedVersion = await hasCachedVersion(url);
  console.log(cachedVersion, 'CACHED');

  if (cachedVersion) {
    return cachedVersion;
  }

  const result = await ogs({
    url,
    fetchOptions: {
      headers: {
        'user-agent':
          'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      },
    },
  });

  if (result.error) {
    return null;
  }

  const { ogTitle, ogDescription, ogImage, favicon } = result.result as any;

  let imageUrl: string = null;
  if (Array.isArray(ogImage)) {
    imageUrl = ogImage[0].url;
  } else if (ogImage) {
    imageUrl = ogImage.url;
  }

  imageUrl = parseUrl(url, imageUrl);

  const openGraph = {
    id: url,
    url,
    title: ogTitle,
    description: ogDescription,
    image_url: imageUrl,
  };

  const { data } = await supabase
    .from('link_previews')
    .upsert(openGraph)
    .select()
    .maybeSingle();

  return data;
};
