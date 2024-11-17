import { LinkPreview } from '@/lib/sanity';
import { linkPreview } from '@/lib/utils/link-preview';
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

  const data = await linkPreview(url);

  if (!data) {
    return NextResponse.json(
      { error: 'Failed to fetch open graph' },
      { status: 404 },
    );
  } else {
    return NextResponse.json<ResponseData>(data);
  }
}
