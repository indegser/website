import { newsApi } from "apis/newsApi";
import { NewsType } from "types/news.types";
import {
  buildUseNewsQueryKey,
  useNewsQuery,
  useNewsQueryKey,
} from "queries/useNewsQuery";
import { Descendant, Element, Node } from "slate";
import { mutate } from "swr";
import debounce from "lodash-es/debounce";
import { extraApi } from "apis/extra";
import { captureException } from "@sentry/nextjs";
import { useRouter } from "next/router";

const extractTitle = (content: Descendant[]) => {
  const headlineNode = content.find((node) => node.type === "headline");
  return headlineNode ? Node.string(headlineNode) : "Untitled";
};

const extractExcerpt = (nodes: Descendant[]) => {
  let description = "";
  for (const node of nodes) {
    if (node.type !== "paragraph") continue;

    const text = Node.string(node).trim();
    description += text;
    description = description.replace(/\.?$/, `. `);

    if (description.length > 300) {
      description.trim();
      break;
    }
  }

  return description;
};

const extractCoverUrl = (nodes: Descendant[]) => {
  for (const node of nodes) {
    if (!Element.isElement(node)) {
      continue;
    }

    if (node.type === "image") {
      return node.url;
    }

    if (node.type === "bookmark") {
      return node.openGraph?.imageUrl;
    }
  }

  return;
};

export const useNewsContent = () => {
  const key = useNewsQueryKey();
  const router = useRouter();
  const { data: news } = useNewsQuery();

  const autoSaveNewsContent = async (nextContent: Descendant[]) => {
    const nextNews: NewsType = {
      ...news,
      title: extractTitle(nextContent),
      excerpt: extractExcerpt(nextContent),
      cover_url: extractCoverUrl(nextContent),
      content: JSON.stringify(nextContent),
    };

    if (!nextNews.id) {
      const result = await newsApi.createNews(nextNews);
      mutate(buildUseNewsQueryKey(result.id), nextNews, false);
      router.replace(`/newsroom/${result.id}`, null, { shallow: true });
      return;
    }

    mutate(key, nextNews, false);

    try {
      await newsApi.updateNewsById(nextNews);
      await extraApi.revalidateNews(nextNews.id);
    } catch (err) {
      captureException(err);
    }

    mutate(key);
  };

  return {
    autoSaveNewsContent: debounce(autoSaveNewsContent, 1000),
  };
};
