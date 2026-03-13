'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export const SetTheme = () => {
  const isReady = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { setTheme, theme } = useTheme();

  if (!isReady) return null;

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="text-button-12 h-7 w-auto pr-1">
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
