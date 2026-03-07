type SupabaseConfig = {
  url: string;
  anonKey: string;
};

type SupabaseAdminConfig = {
  url: string;
  serviceRoleKey: string;
};

const assertValue = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
};

export const getSupabaseConfig = (): SupabaseConfig => {
  const url = assertValue(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NEXT_PUBLIC_SUPABASE_URL',
  );

  const anonKey =
    process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return {
    url,
    anonKey: assertValue(
      anonKey,
      'SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY',
    ),
  };
};

export const getSupabaseAdminConfig = (): SupabaseAdminConfig => {
  const url = assertValue(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NEXT_PUBLIC_SUPABASE_URL',
  );

  const serviceRoleKey = assertValue(
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    'SUPABASE_SERVICE_ROLE_KEY',
  );

  return {
    url,
    serviceRoleKey,
  };
};
