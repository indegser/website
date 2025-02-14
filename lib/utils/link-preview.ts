import 'server-only';

import puppeteer, { Page } from 'puppeteer-core';

export const linkPreview = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const {
    ogTitle: title,
    ogDescription: description,
    ogImage: imageUrl,
  } = await getMetaTags(page);

  return {
    title,
    description,
    imageUrl,
    link: url,
  };
};

const getMetaTags = async (page: Page) => {
  await page.waitForSelector('meta[property="og:title"]');
  const elements = await page.$$('meta[property^="og:"]');
  const res: Record<string, string> = {};
  for (const element of elements) {
    const property = await element.evaluate((e) => e.getAttribute('property'));
    const content = await element.evaluate((e) => e.getAttribute('content'));

    if (!property || !content) {
      continue;
    }

    const key = property
      .split(':')
      .map((v, i) => {
        if (i > 0) {
          return v.substring(0, 1).toUpperCase() + v.substring(1);
        } else {
          return v;
        }
      })
      .join('');

    res[key] = content;
  }

  return res;
};
