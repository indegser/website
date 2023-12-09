'use client';

import { amplitude } from '@/lib/amplitude';
import { useEffect, useRef } from 'react';

interface Props {
  params: Parameters<(typeof amplitude)['track']>;
}

export const VisitTracker = ({ params }: Props) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      amplitude.track(...params);
    }
  }, [params]);

  return null;
};
