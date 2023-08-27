import { NextResponse } from 'next/server';

import { syncApi } from 'lib/utils/sync';

export const dynamic = 'force-dynamic';

export async function GET() {
  const updated = await syncApi.syncLatest();
  return NextResponse.json(updated);
}
