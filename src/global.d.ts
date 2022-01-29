import { Timestamp } from "@firebase/firestore/dist/lite";
import { Component, ReactElement } from "react";
import "react-markdown/src/ast-to-react";

module "react-markdown" {
  declare function ReactMarkdown(options: any): ReactElement;
}

// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = CustomParagraph | CustomImage | CustomYoutube | CustomLink;

type CustomParagraph = {
  type: "paragraph";
  children: Array<CustomImage | CustomYoutube | CustomLink | CustomText>;
};

type CustomImage = {
  type: "image";
  url: string;
  alt?: string;
  children: CustomText[];
};

type CustomYoutube = {
  type: "youtube";
  url: string;
  children: CustomText[];
};

type CustomLink = {
  type: "link";
  url: string;
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
