import type { NextApiRequest, NextApiResponse } from 'next';
import ogs from 'open-graph-scraper';

import { supabase } from '@src/sdks/supabase';

type Data = {
  title: string;
  description: string;
  favicon: string;
  imageUrl: string;
};

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

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const url = req.query.url.toString();

  const cachedVersion = await hasCachedVersion(url);

  if (cachedVersion) {
    res.json(cachedVersion);
    return;
  }

  const result = await ogs({
    url,
    headers: {
      'user-agent':
        'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    },
    downloadLimit: 10000000,
  });

  if (result.error) {
    res.status(400).end();
    return;
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

  const upsertResult = await supabase
    .from('link_previews')
    .upsert(openGraph)
    .select()
    .maybeSingle();

  res.status(200).json(upsertResult.data);
};

export default handler;
