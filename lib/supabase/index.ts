import { createBrowserClient } from '@supabase/ssr';
import { Database, Tables } from './types';

export * from './types';

export * from './token.api';

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
);

export type PageType = Tables<'pages'>;
export type SeriesType = Tables<'series'>;
