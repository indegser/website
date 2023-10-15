import { AuthenticateWithNotion } from '@/components/ui/authenticate-with-notion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const Auth = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return <AuthenticateWithNotion />;
  }

  const { picture, email } = data.session.user.user_metadata;

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={picture} />
      <AvatarFallback>{email.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};
