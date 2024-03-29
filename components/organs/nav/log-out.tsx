'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export const LogOut = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleClick = async () => {
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

  return <DropdownMenuItem onClick={handleClick}>Log Out</DropdownMenuItem>;
};
