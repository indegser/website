import { useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { ReactEditor, withReact } from "slate-react";
import { withHeadline } from "../utils/withHeadline";
import { withHTMLPaste } from "../utils/withHTMLPaste";
import { withImage } from "../utils/withImage";
import { withList } from "../utils/withList";
import { useEditorExitBreak } from "./useEditorExitBreak";
import { useEditorInline } from "./useEditorInline";
import { useEditorMarkdown } from "./useEditorMarkdown";
import { useEditorYoutube } from "./useEditorYoutube";

export const useEditor = (editor?: ReactEditor, isLeafOnly?: boolean) => {
  const { withYoutube } = useEditorYoutube();
  const { withInline } = useEditorInline();
  const { withMarkdown } = useEditorMarkdown();
  const { withExitBreak } = useEditorExitBreak();

  const [slateEditor] = useState(() => {
    if (editor) return editor;

    const baseEditor = createEditor();

    if (isLeafOnly) {
      return withReact(baseEditor);
    }

    return withList(
      withHeadline(
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
