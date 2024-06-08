'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const PostRouter = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = searchParams.get('hash');
    const node = document.querySelector(
      `[data-block-id="${hash}"]`,
    ) as HTMLElement;

    if (!node) return;

    const rect = node.getBoundingClientRect();
    window.scrollTo({
      left: 0,
      top: rect.top + window.scrollY - 120,
      behavior: 'smooth',
    });
  }, [searchParams]);

  return null;
};
