import 'server-only';

import type { PuppeteerNode } from 'puppeteer';
import { LinkPreview } from '../sanity';

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
    executablePath: await chrome.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });
};

export const linkPreview = async (url: string) => {
  const browser = await getBrowser();
  const page = await browser.newPage();
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
