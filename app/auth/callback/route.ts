import { ORIGIN } from '@/lib/constants';
import { Database } from '@/lib/supabase/types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        throw error;
      }

      await supabase.from('tokens').upsert({
        token: data.session.provider_token!,
        user_id: data.user.id,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.warn(err.message);
      }
    }
  }

  return NextResponse.redirect(`${ORIGIN}/dashboard`);
}
