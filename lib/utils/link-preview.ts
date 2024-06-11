import 'server-only';

import ogs from 'open-graph-scraper';
import { LinkPreview } from '../sanity';

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

export const linkPreview = async (url: string) => {
  const result = await ogs({
    url,
    fetchOptions: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    },
    timeout: 10000,
  });

  if (result.error) {
    return null;
  }

  const { ogTitle, ogDescription, ogImage, favicon } = result.result as any;

  let imageUrl: string = '';
  if (Array.isArray(ogImage)) {
    imageUrl = ogImage[0].url;
  } else if (ogImage) {
    imageUrl = ogImage.url;
  }

  imageUrl = parseUrl(url, imageUrl) || '';

  const openGraph: LinkPreview = {
    link: url,
    title: ogTitle,
    description: ogDescription,
    imageUrl,
  };

  return openGraph;
};
