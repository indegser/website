import {
  CookieMethods,
  CookieOptions,
  createServerClient,
} from '@supabase/ssr';

import { createClient } from '@supabase/supabase-js';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

import { cookies as nextCookies } from 'next/headers';
import { supabaseAnonKey, supabaseUrl } from '.';
import { Database } from './types';

export const createServerSupabase = (cookies?: CookieMethods) => {
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    return createClient(supabaseUrl, supabaseAnonKey!);
  }

  const cookieStore = nextCookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey!, {
    cookies: cookies || {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  });
};
