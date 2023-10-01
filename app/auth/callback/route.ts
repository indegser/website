import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { ORIGIN } from 'lib/constants';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });

    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (err) {
      console.warn(err.message);
    }
  }

  return NextResponse.redirect(`${ORIGIN}/login`);
}
