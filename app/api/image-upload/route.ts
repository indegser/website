import { sanityClient } from '@/lib/sanity';
import { SanityImageAssetDocument } from 'next-sanity';
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = SanityImageAssetDocument;

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
    const body = await fetch(url).then((res) => res.blob());
    if (!body) return;

    const result = await sanityClient.assets.upload('image', body, {
      preserveFilename: true,
    });

    return NextResponse.json<ResponseData>(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
