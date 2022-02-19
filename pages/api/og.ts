import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import ogs from "open-graph-scraper";

type Data = {
  title: string;
  description: string;
  favicon: string;
  imageUrl: string;
};

const parseUrl = (originalUrl: string, url: string) => {
  if (!url) return null;
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  if (url.startsWith("/")) {
    return new URL(originalUrl).origin + url;
  }

  return url;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const url = req.query.url.toString();

  const { result } = await ogs({
    url,
    headers: {
      "user-agent":
        "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    },
  });

  if (!result.success) {
    res.status(400).end();
    return;
  }

  const { ogTitle, ogDescription, ogImage, favicon } = result;

  let imageUrl: string = null;
  if (Array.isArray(ogImage)) {
    imageUrl = ogImage[0].url;
  } else if (ogImage) {
    imageUrl = ogImage.url;
  }

  imageUrl = parseUrl(url, imageUrl);
  const fullFavicon = parseUrl(url, favicon);

  res.status(200).json({
    title: ogTitle,
    description: ogDescription,
    favicon: fullFavicon,
    imageUrl,
  });
};

export default withSentry(handler);
