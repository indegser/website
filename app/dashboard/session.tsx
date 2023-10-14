'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getURL } from '@/lib/constants';
import { Database } from '@/lib/supabase';
import { NotionLogoIcon } from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserMetadata } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface Props {
  userMetadata: UserMetadata;
}

export const Session = ({ userMetadata }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { picture, email } = userMetadata;
  const supabase = createClientComponentClient<Database>();

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'notion',
      options: {
        redirectTo: `${getURL()}/auth/callback`,
      },
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: 'destructive',
        title: error.name,
        description: error.message,
      });
    } else {
      router.refresh();
    }
  };

  return (
    <div className="flex justify-between">
      <Avatar>
        <AvatarImage src={picture} />
        <AvatarFallback>{email.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="space-x-4">
        <Button variant="ghost" onClick={signOut}>
          Sign out
        </Button>
        <Button variant="secondary" onClick={signIn}>
          <NotionLogoIcon className="mr-2 h-4 w-4" />
          Re-authenticate
        </Button>
      </div>
    </div>
  );
};
