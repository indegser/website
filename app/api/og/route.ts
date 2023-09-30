import { NextRequest, NextResponse } from 'next/server';

import { client } from '@/lib/sanity';
import { linkPreview } from '@/lib/utils/link-preview';
import { UploadBody } from 'next-sanity';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      {
        message: 'Should provide url',
      },
      {
        status: 400,
      },
    );
  }

  const updated = await linkPreview(url);
  const { image_url } = updated;

  const response = await fetch(image_url);
  const result = await client.assets.upload(
    'image',
    response.body as unknown as UploadBody,
  );

  return NextResponse.json({
    title: updated.title,
    description: updated.description,
    cover: {
      _type: 'image',
      asset: {
        _ref: result._id,
        _type: 'reference',
      },
    },
  });
}
