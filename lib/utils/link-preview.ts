import 'server-only';

import type { Page, PuppeteerNode } from 'puppeteer';

let chrome: Record<string, any> = { args: [] };
let puppeteer: PuppeteerNode;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chrome = require('@sparticuz/chromium');
  puppeteer = require('puppeteer-core');
} else {
  // running locally.
  puppeteer = require('puppeteer');
}

const getBrowser = async () => {
  return puppeteer.launch({
    args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chrome.defaultViewport,
    executablePath: chrome.executablePath
      ? await chrome.executablePath()
      : undefined,
    headless: true,
    ignoreHTTPSErrors: true,
  });
};

export const linkPreview = async (url: string) => {
  const browser = await getBrowser();
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
