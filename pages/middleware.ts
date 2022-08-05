import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { redis } from "@src/sdks/redis";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.next();

  const cached = await redis.hgetall(`opengraph:${url}`);

  if (!cached) return NextResponse.next();

  return NextResponse.json(cached);
}

export const config = {
  matcher: ["/api/og"],
};
