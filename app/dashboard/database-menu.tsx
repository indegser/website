'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { Tables, supabase } from '@/lib/supabase';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

interface Props {
  data: Tables<'databases'>['raw_data'];
}

export const DatabaseMenu = ({ data }: Props) => {
  const { toast } = useToast();
  const handleDelete = async () => {
    const { error } = await supabase
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
      <DropdownMenuTrigger>
        <Button size="icon" variant="ghost">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
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
