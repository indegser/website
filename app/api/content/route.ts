import { NextResponse } from 'next/server';

import { syncApi } from '@src/utils/sync';

export const dynamic = 'force-dynamic';

export async function GET() {
  const updated = await syncApi.syncLatest();
  return NextResponse.json(updated);
}
