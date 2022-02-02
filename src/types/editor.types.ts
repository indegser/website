// TypeScript users only add this code
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export type CustomElement =
  | CustomParagraph
  | CustomImage
  | CustomYoutube
  | CustomLink
  | CustomTitle
  | CustomHeading;

export type CustomParagraph = {
  type: "paragraph" | "p" | "ul" | "li";
  children: Array<CustomImage | CustomYoutube | CustomLink | CustomText>;
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

export type CustomText = {
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
