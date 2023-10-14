'use client';

import { PageContainer } from '@/components/atoms/Container';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthError } from '@supabase/supabase-js';
import { ORIGIN } from 'lib/constants';

export const LoginForm = () => {
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  const handleClick = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'notion',
        options: {
          redirectTo: `${ORIGIN}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      if (err instanceof AuthError) {
        toast({
          title: err.name,
          description: err.message,
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <PageContainer>
      <div className="h-full w-full">
        <Button onClick={handleClick}>Login with Notion</Button>
      </div>
    </PageContainer>
  );
};
