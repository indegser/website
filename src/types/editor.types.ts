// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

export type CustomElement =
  | CustomParagraph
  | CustomImage
  | CustomYoutube
  | CustomLink
  | CustomTitle
  | CustomHeading
  | CustomBulletList
  | CustomListItem
  | CustomBlockquote
  | CustomBookmark
  | CustomCaption;

export type CustomParagraph = {
  type: "paragraph" | "p" | "ul" | "li";
  children: Array<
    CustomImage | CustomYoutube | CustomLink | CustomText | CustomBulletList
  >;
};

export type CustomImage = {
  type: "image";
  url: string;
  alt?: string;
  children: CustomText[];
};

export type CustomYoutube = {
  type: "youtube";
  url: string;
  children: CustomText[];
};

export type CustomLink = {
  type: "link" | "a";
  url: string;
  children: CustomText[];
};

export type CustomTitle = {
  type: "title";
  children: CustomText[];
};

export type CustomHeading = {
  type: "heading";
  level: 1 | 2 | 3;
  children: CustomText[];
};

export type CustomBulletList = {
  type: "bullet-list";
  children: CustomText[];
};

export type CustomListItem = {
  type: "list-item";
  children: CustomText[];
};

export type CustomBlockquote = {
  type: "block-quote";
  children: CustomText[];
  backgroundColor?: string;
  emoji?: string;
};

export type CustomBookmark = {
  type: "bookmark";
  children: CustomText[];
  url: string;
  caption: {
    isEnabled: boolean;
    children?: Descendant[];
  };
  openGraph?: {
    title: string;
    description: string;
    favicon: string;
    imageUrl: string;
  };
};

export type CustomCaption = {
  type: "caption";
  children: CustomText[];
};

export type CustomText = {
  type?: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
  highlight?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
