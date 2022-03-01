import { Editor, Element, Node, Path, Transforms } from "slate";
import { jsx } from "slate-hyperscript";
import { ReactEditor } from "slate-react";
import { CustomElement } from "types/editor.types";

const ELEMENT_TAGS: Record<
  string,
  (el?: HTMLElement) => Omit<CustomElement, "children">
> = {
  A: (el) => ({ type: "link" as const, url: el.getAttribute("href") }),
  BLOCKQUOTE: () => ({ type: "caption" }),
  H1: () => ({ type: "heading", level: 1 }),
  H2: () => ({ type: "heading", level: 2 }),
  H3: () => ({ type: "heading", level: 3 }),
  H4: () => ({ type: "heading", level: 3 }),
  H5: () => ({ type: "heading", level: 3 }),
  H6: () => ({ type: "heading", level: 3 }),
  IMG: (el) => ({ type: "image" as const, url: el.getAttribute("src") }),
  LI: () => ({ type: "list-item" }),
  OL: () => ({ type: "list-item" }),
  P: () => ({ type: "paragraph" }),
  DIV: () => ({ type: "paragraph" }),
  PRE: () => ({ type: "paragraph" }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

export const deserialize = (el: HTMLElement) => {
  if (el.nodeType === 3) {
    // Plain text: "#text"
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return jsx("element", { type: "paragraph" }, [{ text: "" }]);
  }

  const { nodeName } = el;
  let parent = el;

  // if (
  //   nodeName === "PRE" &&
  //   el.childNodes[0] &&
  //   el.childNodes[0].nodeName === "CODE"
  // ) {
  //   parent = el.childNodes[0];
  // }
  let children = Array.from(parent.childNodes).map(deserialize).flat();

  if (children.length === 0) {
    children = [{ text: "" }];
  }

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx("element", attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => jsx("text", attrs, child));
  }

  return children;
};

export const withHTMLPaste = (editor: ReactEditor) => {
  const { insertData, normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    /**
     * Headline이 두 개 이상 있으면 두 번째 Headline은 paragraph로 변환한다.
     */
    if (Element.isElement(node) && node.type === "headline" && path[0] !== 0) {
      Transforms.splitNodes(editor);
      Transforms.setNodes(editor, { type: "paragraph" });
    }

    // If the element is a paragraph, ensure its children are valid.
    if (Element.isElement(node) && node.type === "paragraph") {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (Element.isElement(child) && !editor.isInline(child)) {
          if (child.type === "heading") {
            Transforms.liftNodes(editor, { at: childPath });
            return;
          }

          Transforms.unwrapNodes(editor, { at: childPath });
          return;
        }
      }
    }

    normalizeNode(entry);
  };

  editor.insertData = (data) => {
    const html = data.getData("text/html");

    if (!html) {
      insertData(data);
      return;
    }

    const parsed = new DOMParser().parseFromString(html, "text/html");
    const fragment = deserialize(parsed.body);
    const isHeadline = editor.selection.anchor.path[0] === 0;

    if (isHeadline) {
      if (fragment.length === 1) {
        Editor.insertText(editor, Node.string(fragment[0]));
        return;
      }

      Editor.insertBreak(editor);
    }

    Transforms.insertFragment(editor, fragment);
  };

  return editor;
};
