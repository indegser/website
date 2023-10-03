import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserMetadata } from '@supabase/supabase-js';

interface Props {
  userMetadata: UserMetadata;
}

export const Session = ({ userMetadata }: Props) => {
  const { picture, email } = userMetadata;

  return (
    <div>
      <Avatar>
        <AvatarImage src={picture} />
        <AvatarFallback>{email.slice(0, 1)}</AvatarFallback>
      </Avatar>
    </div>
  );
};
