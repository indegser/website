import { Descendant, Element, Node } from "slate";

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

export const useNewsMeta = () => {
  const extractNewsMeta = (content: Descendant[]) => {
    return {
      title: extractTitle(content),
      excerpt: extractExcerpt(content),
      cover_url: extractCoverUrl(content),
    };
  };

  return { extractNewsMeta };
};
