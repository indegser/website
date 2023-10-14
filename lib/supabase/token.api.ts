import { SupabaseClient } from '@supabase/supabase-js';

const getToken = async (supabase: SupabaseClient) => {
  return supabase.from('tokens').select('token').single();
};

export const tokenApi = {
  getToken,
};
