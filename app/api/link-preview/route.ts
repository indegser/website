import { LinkPreview } from '@/lib/sanity';
import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = LinkPreview;

export const maxDuration = 50; // This function can run for a maximum of 50 seconds
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'url searchParam is required' },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const data: ResponseData = {
      title: $('meta[property="og:title"]').attr('content'),
      description: $('meta[property="og:description"]').attr('content'),
      imageUrl: $('meta[property="og:image"]').attr('content'),
      link: url,
    };

    return NextResponse.json<ResponseData>(data);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch open graph' },
      { status: 404 },
    );
  }
}
