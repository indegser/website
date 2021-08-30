import unified from "unified";
import parser from "remark-parse";
import { select } from "unist-util-select";
import compiler from "remark-stringify";
import dayjs from "dayjs";

export const useIssueSEO = (body: string) => {
  const tree = unified().use(parser).parse(body) as any;
  let image: string;
  let description: string;

  const imageNode = select("image", tree);

  if (imageNode) {
    image = imageNode.url as string;
  }

  if (tree.children[0].type === "paragraph") {
    description = unified().use(compiler).stringify(tree.children[0]);
  }

  return {
    image,
    description,
  };
};

export const useIssueUpdatedAt = (updatedAt: string) => {
  return dayjs(updatedAt).format("MMM. D, YYYY, h:mm a.");
};
