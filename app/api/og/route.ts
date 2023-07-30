import { NextRequest, NextResponse } from 'next/server';

import { linkPreview } from '@src/utils/linkPreview';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  const data = await linkPreview(url);
  return NextResponse.json(data);
}
