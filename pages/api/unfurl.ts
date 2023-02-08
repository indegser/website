const DATABASE_ID = '92578db813d44c2db2b04c6222627677';

import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints';
import type { NextApiRequest, NextApiResponse } from 'next';
import ogs from 'open-graph-scraper';

import { notion } from '@src/sdks/notion';
import { uploadImageToSupabase } from '@src/utils/image/uploadImageToSupabase';

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

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreatePageResponse>
) => {
  const url = req.query.url.toString();

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

  const { ogTitle, ogDescription, ogImage } = result.result as any;

  let imageUrl: string = null;
  if (Array.isArray(ogImage)) {
    imageUrl = ogImage[0].url;
  } else if (ogImage) {
    imageUrl = ogImage.url;
  }

  imageUrl = parseUrl(url, imageUrl);
  const supabaseResult = await uploadImageToSupabase(imageUrl, 'notion');

  const openGraph = {
    title: ogTitle,
    description: ogDescription,
    imageUrl: supabaseResult && supabaseResult.publicURL,
  };

  const response = await notion.pages.create({
    parent: {
      type: 'database_id',
      database_id: DATABASE_ID,
    },
    cover: {
      type: 'external',
      external: {
        url: openGraph.imageUrl,
      },
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: openGraph.title,
            },
          },
        ],
      },
      Description: {
        rich_text: [
          {
            text: {
              content: openGraph.description,
            },
          },
        ],
      },
      URL: {
        url,
      },
    },
  });

  res.status(200).json(response);
};

export default handler;
