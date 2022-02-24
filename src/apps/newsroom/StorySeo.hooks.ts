import { Descendant, Node } from "slate";
import { CustomImage } from "types/editor.types";
import { StoryType } from "types/story.types";

const parseDescription = (nodes: Descendant[]) => {
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

const parseOgImage = (nodes: Descendant[]) => {
  const imageNode = nodes.find(
    (node) => node.type && node.type === "image"
  ) as CustomImage | null;

  return imageNode ? imageNode.url : undefined;
};

export const useStorySEO = (story: StoryType) => {
  const nodes = JSON.parse(story.content);

  return {
    title: story.title,
    description: parseDescription(nodes),
    ogImage: parseOgImage(nodes),
  };
};
