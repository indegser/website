import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserMetadata } from '@supabase/supabase-js';

interface Props {
  userMetadata: UserMetadata;
}

export const Session = ({ userMetadata }: Props) => {
  const { picture, email } = userMetadata;

  const handleSignOut = async () => {
    'use server';
  };

  return (
    <div>
      <Avatar>
        <AvatarImage src={picture} />
        <AvatarFallback>{email.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div>
        <form action={handleSignOut}>
          <Button>Sign out</Button>
        </form>
      </div>
    </div>
  );
};
