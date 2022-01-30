import { useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { ReactEditor, withReact } from "slate-react";
import { useEditorImage } from "./useEditorImage";
import { useEditorInline } from "./useEditorInline";
import { useEditorLayout } from "./useEditorLayout";
import { useEditorYoutube } from "./useEditorYoutube";

export const useEditor = (editor?: ReactEditor) => {
  const { withImage } = useEditorImage();
  const { withYoutube } = useEditorYoutube();
  const { withInline } = useEditorInline();
  const { withLayout } = useEditorLayout();

  const [slateEditor] = useState(() => {
    if (editor) return editor;

    const baseEditor = createEditor();
    return withLayout(
      withInline(withYoutube(withImage(withHistory(withReact(baseEditor)))))
    );
  });

  return slateEditor;
};
