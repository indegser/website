import { useState } from "react";
import { Descendant } from "slate";
import { CustomHeading } from "types/editor.types";

const initialValue: Descendant[] = [
  {
    type: "title",
    children: [
      {
        text: "The Next.js Static Site Generator",
      },
    ],
  },
];

export const useEditorValue = (defaultValue: Descendant[]) => {
  const migrateHeading = defaultValue.map((block) => {
    if ("type" in block && "children" in block) {
      switch (block.type as any) {
        case "h1": {
          return {
            type: "heading",
            level: 1,
            children: block.children,
          } as CustomHeading;
        }
        case "h2": {
          return {
            type: "heading",
            level: 2,
            children: block.children,
          } as CustomHeading;
        }
        case "h3": {
          return {
            type: "heading",
            level: 3,
            children: block.children,
          } as CustomHeading;
        }
      }
    }

    return block;
  });

  return useState(migrateHeading ?? initialValue);
  // return useState(initialValue);
};
