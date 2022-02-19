import { useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { ReactEditor, withReact } from "slate-react";
import { withHTMLPaste } from "../utils/withHTMLPaste";
import { withList } from "../utils/withList";
import { useEditorExitBreak } from "./useEditorExitBreak";
import { useEditorImage } from "./useEditorImage";
import { useEditorInline } from "./useEditorInline";
import { useEditorLayout } from "./useEditorLayout";
import { useEditorMarkdown } from "./useEditorMarkdown";
import { useEditorYoutube } from "./useEditorYoutube";

export const useEditor = (editor?: ReactEditor, isLeafOnly?: boolean) => {
  const { withImage } = useEditorImage();
  const { withYoutube } = useEditorYoutube();
  const { withInline } = useEditorInline();
  const { withLayout } = useEditorLayout();
  const { withMarkdown } = useEditorMarkdown();
  const { withExitBreak } = useEditorExitBreak();

  const [slateEditor] = useState(() => {
    if (editor) return editor;

    const baseEditor = createEditor();

    if (isLeafOnly) {
      return withReact(baseEditor);
    }

    return withLayout(
      withList(
        withExitBreak(
          withMarkdown(
            withYoutube(
              withInline(
                withImage(withHTMLPaste(withHistory(withReact(baseEditor))))
              )
            )
          )
        )
      )
    );
  });

  return slateEditor;
};
