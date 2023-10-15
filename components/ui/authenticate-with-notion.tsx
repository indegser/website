'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { NotionLogoIcon } from '@radix-ui/react-icons';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthError } from '@supabase/supabase-js';

export const AuthenticateWithNotion = () => {
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  const authenticate = async () => {
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
    <Button onClick={authenticate}>
      <NotionLogoIcon className="mr-2 h-4 w-4" />
      Sign In with Notion
    </Button>
  );
};
