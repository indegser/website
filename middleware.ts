import { NextResponse } from 'next/server';

import { CookieOptions } from '@supabase/ssr';
import type { NextRequest } from 'next/server';
import { createSupabase } from './lib/supabase/create-supabase';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createSupabase({
    get(name: string) {
      return request.cookies.get(name)?.value;
    },
    set(name: string, value: string, options: CookieOptions) {
      request.cookies.set({
        name,
        value,
        ...options,
      });
      response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
      response.cookies.set({
        name,
        value,
        ...options,
      });
    },
    remove(name: string, options: CookieOptions) {
      request.cookies.set({
        name,
        value: '',
        ...options,
      });
      response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
      response.cookies.set({
        name,
        value: '',
        ...options,
      });
    },
  });
  await supabase.auth.getSession();

  return response;
}
