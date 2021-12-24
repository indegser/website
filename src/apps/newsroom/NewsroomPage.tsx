import { PlateEditor } from "@udecode/plate-core";
import { ELEMENT_H1 } from "@udecode/plate-heading";

import { useMemo } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { useAutoSave } from "./NewsroomPage.hooks";
import { Renderer } from "./Renderer";

interface Props {
  content: any;
}

export const NewsroomPage = ({ content }: Props) => {
  const initialValue = content ?? [
    {
      type: ELEMENT_H1,
      children: [{ text: "" }],
    },
  ];

  const editor = useMemo(() => withReact(createEditor()), []) as PlateEditor;

  const { handleAutoSave } = useAutoSave();

  const handleChange = (value) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );

    if (isAstChange) {
      handleAutoSave(value);
    }
  };

  return (
    <Renderer
      editor={editor}
      initialValue={initialValue}
      onChange={handleChange}
    />
  );
};
