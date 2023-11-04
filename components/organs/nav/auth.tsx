import { AuthenticateWithNotion } from '@/components/ui/authenticate-with-notion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { createSupabase } from '@/lib/supabase/create-supabase';
import Link from 'next/link';
import { LogOut } from './log-out';
import { SetTheme } from './set-theme';

export const Auth = async () => {
  const supabase = createSupabase();

  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return <AuthenticateWithNotion />;
  }

  const { picture, email, name } = data.session.user.user_metadata;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarImage src={picture} />
          <AvatarFallback>{email.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        <DropdownMenuLabel>
          <div className="font-normal">{name}</div>
          <div className="font-normal text-muted-foreground">{email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <SetTheme />
        <DropdownMenuSeparator />
        <LogOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
