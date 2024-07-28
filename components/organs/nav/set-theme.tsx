'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const SetTheme = () => {
  const [isReady, setIsReady] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="h-7 w-auto pr-1 text-xs">
        <SelectValue defaultValue={theme} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};
