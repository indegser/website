import { ReactEditor } from "slate-react";
import isUrl from "is-url";
import { CustomLink } from "@src/types/editor.types";
import { Editor, Range, Transforms, Element, Path, Node } from "slate";

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
        caption: { isEnabled: false },
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
    const {
      insertData,
      insertText,
      isVoid,
      isInline,
      deleteBackward,
      deleteForward,
    } = editor;

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

    editor.deleteBackward = (unit) => {
      if (
        !editor.selection ||
        !Range.isCollapsed(editor.selection) ||
        editor.selection.anchor.offset !== 0
      ) {
        return deleteBackward(unit);
      }

      const parentPath = Path.parent(editor.selection.anchor.path);
      const parentNode = Node.get(editor, parentPath);
      const parentIsEmpty = Node.string(parentNode).length === 0;

      if (parentIsEmpty && Path.hasPrevious(parentPath)) {
        const prevNodePath = Path.previous(parentPath);
        const prevNode = Node.get(editor, prevNodePath);
        if (Editor.isVoid(editor, prevNode)) {
          Transforms.removeNodes(editor);
          Transforms.move(editor, { unit: "line", distance: 1, reverse: true });
          return;
        }
      }

      deleteBackward(unit);
    };

    editor.deleteForward = (unit) => {
      if (
        !editor.selection ||
        !Range.isCollapsed(editor.selection) ||
        editor.selection.anchor.offset !== 0
      ) {
        return deleteForward(unit);
      }

      const parentPath = Path.parent(editor.selection.anchor.path);
      const parentNode = Node.get(editor, parentPath);
      const parentIsEmpty = Node.string(parentNode).length === 0;

      if (parentIsEmpty) {
        const nextNodePath = Path.next(parentPath);
        const nextNode = Node.get(editor, nextNodePath);
        if (Editor.isVoid(editor, nextNode)) {
          Transforms.removeNodes(editor);
          return;
        }
      }

      deleteForward(unit);
    };

    return editor;
  };

  return { withInline };
};
