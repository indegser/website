import { ReactEditor } from "slate-react";
import isUrl from "is-url";
import { CustomLink } from "types/editor.types";
import { Editor, Range, Transforms, Element } from "slate";

const isLinkActive = (editor: ReactEditor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
  return !!link;
};

const unwrapLink = (editor: ReactEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
};

const wrapLink = (editor: ReactEditor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const link: CustomLink = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    const { offset } = Range.start(selection);

    /**
     * offset 사용하면 Block 중간인지, 시작지점인지 알 수 있음.
     */
    if (offset === 0) {
      Transforms.insertNodes(editor, {
        type: "bookmark",
        url,
        children: [{ text: "" }],
      });
    } else {
      Transforms.insertNodes(editor, link);
    }
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export const useEditorInline = () => {
  const withInline = (editor: ReactEditor) => {
    const { insertData, insertText, isVoid, isInline } = editor;

    editor.isVoid = (element) => element.type === "bookmark" || isVoid(element);

    editor.isInline = (element) =>
      ["link", "button"].includes(element.type) || isInline(element);

    editor.insertText = (text) => {
      if (text && isUrl(text)) {
        wrapLink(editor, text);
      } else {
        insertText(text);
      }
    };

    editor.insertData = (data) => {
      const text = data.getData("text/plain");
      // const parsed = new DOMParser().parseFromString(
      //   data.getData("text/html"),
      //   "text/html"
      // );
      if (text && isUrl(text)) {
        wrapLink(editor, text);
      } else {
        insertData(data);
      }
    };

    return editor;
  };

  return { withInline };
};
