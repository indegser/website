import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { usePageContentQuery } from '@src/queries/usePageContentQuery';
import { usePageQuery } from '@src/queries/usePageQuery';
import { getMetaFromNotionPage } from '@src/utils/notion/meta';

export const useJournalRouter = () => {
  const router = useRouter();

  const scrollToBlock = useCallback(() => {
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
  }, []);

  useIsomorphicLayoutEffect(() => {
    scrollToBlock();

    router.events.on('hashChangeComplete', scrollToBlock);
    return () => {
      router.events.off('hashChangeComplete', scrollToBlock);
    };
  }, [scrollToBlock]);
};

export const useJournalMetadata = (id: string) => {
  const { data: page } = usePageQuery(id);
  const {
    data: {
      pages: [{ results: blocks }],
    },
  } = usePageContentQuery(id);

  return getMetaFromNotionPage(page, blocks);
};
