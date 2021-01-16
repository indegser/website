import githubApi from "apis/github";
import useSWR from "swr";
import unified from "unified";
import parser from "remark-parse";
import toString from "mdast-util-to-string";
import { select } from "unist-util-select";

export interface Book {
  id: string;
  author: string;
  title: string;
  cover?: string;
  link?: string;
  excerpt?: string;
}

export const useBooks = () => {
  const engine = unified().use(parser);
  const { data } = useSWR("books", githubApi.getBooks);

  if (!data) return null;

  return data.data.map((book) => {
    const { title, body } = book;
    const tree = engine.parse(body) as any;

    let key: string;
    const res = ({ id: book.id, title } as unknown) as Book;

    for (const child of tree.children) {
      switch (child.type) {
        case "paragraph": {
          if (key === "cover") {
            res[key] = select("image", child)?.url as string;
          } else {
            res[key] = toString(child);
          }
        }
        case "heading": {
          key = toString(child).toLowerCase();
        }
      }
    }

    return res;
  });
};
