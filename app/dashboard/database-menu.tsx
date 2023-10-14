'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { Database, Tables } from '@/lib/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Props {
  data: Tables<'databases'>['raw_data'];
}

export const DatabaseMenu = ({ data }: Props) => {
  const { toast } = useToast();
  const handleDelete = async () => {
    const { error } = await createClientComponentClient<Database>()
      .from('databases')
      .delete()
      .eq('id', data.id);

    if (error) {
      toast({
        title: 'Failed to delete database',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted database!',
      });
    }
  };

  const menuItems = [{ title: 'Delete', onClick: handleDelete }];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>...</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Setting</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((menuItem) => {
          return (
            <DropdownMenuItem key={menuItem.title} onClick={menuItem.onClick}>
              {menuItem.title}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
