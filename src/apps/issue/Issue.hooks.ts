import { unified } from "unified";
import parser from "remark-parse";
import { select, selectAll } from "unist-util-select";
import dayjs from "dayjs";
import { toString } from "mdast-util-to-string/index";

export const useIssueSEO = (body: string) => {
  const tree = unified()
    .use(parser)
    .parse(body) as any;
  let image: string;
  let description = "";

  const imageNode = select("image", tree);

  if (imageNode) {
    image = (imageNode as any).url as string;
  }

  const textTree = selectAll("paragraph > text", tree);

  for (const node of textTree) {
    const string = toString(node);

    description += `${string} `;
    if (description.length > 300) {
      break;
    }
  }

  return {
    image,
    description,
  };
};

export const useIssueUpdatedAt = (updatedAt: string) => {
  return dayjs(updatedAt).format("MMM. D, YYYY, h:mm a.");
};
