import { LinkPreview } from '@/lib/sanity';
import * as cheerio from 'cheerio';
import getYouTubeID from 'get-youtube-id';
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = LinkPreview;

export const dynamic = 'force-dynamic';

async function fetchYouTube(videoId: string) {
  const data = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`,
  );

  const json = await data.json();
  return {
    title: json.items[0].snippet.title,
    description:
      json.items[0].snippet.description.replace(/\n/g, ' ').length > 140
        ? json.items[0].snippet.description
            .replace(/\n/g, ' ')
            .substring(0, 137) + '...'
        : json.items[0].snippet.description.replace(/\n/g, ' '),
    imageUrl: json.items[0].snippet.thumbnails.maxres.url,
    link: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'url searchParam is required' },
      { status: 400 },
    );
  }

  const videoId = getYouTubeID(url);

  try {
    if (videoId) {
      const data = await fetchYouTube(videoId);
      return NextResponse.json<ResponseData>(data);
    }

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
