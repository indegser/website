import { ReactEditor } from "slate-react";
import isUrl from "is-url";
import { Transforms } from "slate";
import { CustomYoutube } from "types/editor.types";

export const useEditorYoutube = () => {
  const insertYoutubeNode = (editor: ReactEditor, url: string) => {
    const node: CustomYoutube = {
      type: "youtube",
      url,
      caption: { isEnabled: true },
      children: [{ text: "" }],
    };

    Transforms.insertNodes(editor, node);
  };

  const withYoutube = (editor: ReactEditor) => {
    const { isVoid, insertText, insertData } = editor;
    editor.isVoid = (element) =>
      element.type === "youtube" ? true : isVoid(element);

    editor.insertText = (text) => {
      if (text && isUrl(text)) {
        insertYoutubeNode(editor, text);
      } else {
        insertText(text);
      }
    };

    editor.insertData = (data) => {
      const text = data.getData("text/plain");

      if (
        text &&
        isUrl(text) &&
        new URL(text).hostname.includes("youtube.com")
      ) {
        insertYoutubeNode(editor, text);
      } else {
        insertData(data);
      }
    };

    return editor;
  };

  return {
    withYoutube,
  };
};
