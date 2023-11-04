import {
  CookieMethods,
  createBrowserClient,
  createServerClient,
} from '@supabase/ssr';
import { cookies as nextCookies } from 'next/headers';
import { Database, Tables } from './types';
export * from './types';

export * from './token.api';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
);

export const createSupabase = (cookies?: CookieMethods) => {
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

export type PageType = Tables<'pages'>;
export type SeriesType = Tables<'series'>;
