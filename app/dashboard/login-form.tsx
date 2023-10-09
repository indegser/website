'use client';

import { PageContainer } from '@/components/atoms/Container';
import { Button } from '@/components/ui/button';
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
    <PageContainer>
      <div className="h-full w-full">
        <Button onClick={handleClick}>Login with Notion</Button>
      </div>
    </PageContainer>
  );
};
