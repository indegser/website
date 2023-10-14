import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './types';
export * from './types';

export * from './token.api';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey!, {
  auth: {
    persistSession: false,
  },
});

export type PageType = Tables<'pages'>;
export type SeriesType = Tables<'series'>;
