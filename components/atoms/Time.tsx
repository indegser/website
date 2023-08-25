'use client';

import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { useIsomorphicLayoutEffect } from '@src/hooks/layout-effect';

interface Props {
  date: string;
  template: string;
}
export const Time = ({ date, template }: Props) => {
  const [visibility, setVisibility] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setVisibility(true);
  }, []);

  const text = useMemo(() => {
    return dayjs(date).format(template);
  }, [date, template]);

  return (
    <span style={{ contentVisibility: visibility ? 'auto' : 'hidden' }}>
      {visibility ? text : ''}
    </span>
  );
};
