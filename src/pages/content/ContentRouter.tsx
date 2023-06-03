'use client';

import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';

const scrollToBlock = () => {
  const blockId = location.hash.substring(1);
  const node = document.querySelector(
    `[data-block-id="${blockId}"]`
  ) as HTMLElement;
  if (!node) return;

  const rect = node.getBoundingClientRect();

  /**
   * 120px 정도 더 보이도록 함
   */
  window.scrollTo(0, rect.top + window.scrollY - 120);
  node.focus();
};

export const ContentRouter = () => {
  useIsomorphicLayoutEffect(() => {
    scrollToBlock();
  }, [scrollToBlock]);

  return null;
};
