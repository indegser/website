'use client';

import { PageContainer } from '@/components/atoms/Container';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthError } from '@supabase/supabase-js';

export const LoginForm = () => {
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  const handleClick = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'notion',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
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
