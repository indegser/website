import 'server-only';

import puppeteer from 'puppeteer';
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
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(url);
  const title = await page.waitForSelector('title');

  // let imageUrl: string = '';
  // if (Array.isArray(ogImage)) {
  //   imageUrl = ogImage[0].url;
  // } else if (ogImage) {
  //   imageUrl = ogImage.url;
  // }

  // imageUrl = parseUrl(url, imageUrl) || '';

  const openGraph: LinkPreview = {
    link: url,
    title: (await title?.evaluate((e) => e.textContent)) || '',
    description: '',
    imageUrl: '',
  };

  return openGraph;
};
