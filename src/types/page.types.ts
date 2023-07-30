import { Database } from './supabase.types';

export type SupabasePageType = Database['public']['Tables']['pages']['Row'];
export type SupabaseSeriesType = Database['public']['Tables']['series']['Row'];
