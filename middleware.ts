import { get } from '@vercel/edge-config';
import { NextResponse } from 'next/server';

import { IndexConfigType } from '@src/types/indexes';

export const config = { matcher: '/config' };

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const indexes = await get<IndexConfigType[]>('indexes');
  const index = indexes.find((index) => index.id === id);

  return NextResponse.json(index ?? {});
}
