'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from 'next-themes';

export const SetTheme = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex h-8 items-center justify-between px-2 text-sm">
      <div>Theme</div>
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="h-7 w-[100px] text-xs">
          <SelectValue defaultValue={theme} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
