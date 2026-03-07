import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from './env';

export const createSupabaseServerClient = () => {
  const { url, anonKey } = getSupabaseConfig();

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
