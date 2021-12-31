import { Node } from "slate";
import { StoryType } from "types/story.types";

export const useStorySEO = (story: StoryType) => {
  const nodes = JSON.parse(story.content);

  let description = "";
  for (const node of nodes) {
    if (node.type !== "p") continue;

    const text = Node.string(node).trim();
    description += text;
    description = description.replace(/\.?$/, `. `);

    if (description.length > 300) {
      description.trim();
      break;
    }
  }

  return {
    title: story.title,
    description,
  };
};
