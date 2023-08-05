'use client';

import { useInView } from 'framer-motion';
import { ElementRef, useEffect, useRef } from 'react';

import { amplitude } from '@src/sdks/analytics';

export const Feedback = () => {
  const ref = useRef<ElementRef<'div'>>(null);
  const isInView = useInView(ref, { amount: 'all', once: true });

  useEffect(() => {
    if (!isInView) return;

    amplitude.track('view_feedback');
  }, [isInView]);

  return <div ref={ref}>Feedback</div>;
};
