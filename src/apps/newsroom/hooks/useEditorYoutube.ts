import { ReactEditor } from "slate-react";

export const useEditorYoutube = () => {
  const withYoutube = (editor: ReactEditor) => {
    const { isVoid } = editor;
    editor.isVoid = (element) =>
      element.type === "youtube" ? true : isVoid(element);
    return editor;
  };

  return {
    withYoutube,
  };
};
