import { useRouter } from "next/router";
import { useCallback } from "react";

import { useIsomorphicLayoutEffect } from "@src/hooks/useIsomorphicLayoutEffect";
import { BlockType, NewsType } from "@src/types/notion.types";

export const useNewsSeo = (news: NewsType, blocks: BlockType[]) => {
  const { title, excerpt } = news.properties;
  const image = blocks.find(
    (block): block is Extract<BlockType, { type: "image" }> =>
      block.type === "image"
  );

  let imageUrl: string;

  if (image) {
    if (image.image["type"] === "file") {
      imageUrl = image.image.file.url;
    } else {
      imageUrl = image.image.external.url;
    }
  }

  return {
    title: title.title[0]?.plain_text,
    excerpt: excerpt?.rich_text[0]?.plain_text,
    imageUrl,
  };
};

export const useNewsHashRouter = () => {
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

    router.events.on("hashChangeComplete", scrollToBlock);
    return () => {
      router.events.off("hashChangeComplete", scrollToBlock);
    };
  }, [scrollToBlock]);
};
