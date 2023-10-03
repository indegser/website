'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ORIGIN } from 'lib/constants';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const handleClick = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'notion',
      options: {
        redirectTo: `${ORIGIN}/auth/callback`,
      },
    });

    router.refresh();
  };

  return (
    <div>
      <button onClick={handleClick} style={{ color: 'white' }}>
        Login with Notion
      </button>
      {/* <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.refresh();
        }}
        style={{ color: 'white' }}
      >
        Sign Out
      </button> */}
    </div>
  );
};
