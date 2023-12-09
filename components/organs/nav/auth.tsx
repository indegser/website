'use client';

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

import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LogOut } from './log-out';
import { SetTheme } from './set-theme';

export const Auth = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  if (typeof session == 'undefined') return null;

  if (!session) {
    return <AuthenticateWithNotion />;
  }

  const { picture, email, name } = session.user.user_metadata;

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
