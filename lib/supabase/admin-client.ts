import { createClient } from '@supabase/supabase-js';
import { getSupabaseAdminConfig } from './env';

export const createSupabaseAdminClient = () => {
  const { url, serviceRoleKey } = getSupabaseAdminConfig();

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
