import { createClient } from '@supabase/supabase-js';

import { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

export type PageType = Database['public']['Tables']['pages']['Row'];
export type SeriesType = Database['public']['Tables']['series']['Row'];
