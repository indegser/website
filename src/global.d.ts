import { Timestamp } from "@firebase/firestore/dist/lite";
import { Component, ReactElement } from "react";
import "react-markdown/src/ast-to-react";

module "react-markdown" {
  declare function ReactMarkdown(options: any): ReactElement;
}

// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement =
  | {
      type: "paragraph" | "code" | "bold" | "image";
      children: CustomText[];
    }
  | CustomImage;

type CustomImage = {
  type: "image";
  src: string;
  alt: string;
  children: CustomText[];
};

type CustomText = { text: string; bold?: boolean };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

interface StoryData {
  id: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
