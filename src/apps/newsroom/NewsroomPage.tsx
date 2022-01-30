import { Descendant } from "slate";
import { useEditor } from "./hooks/useEditor";
import { useAutoSave } from "./NewsroomPage.hooks";
import { Renderer } from "./Renderer";

interface Props {
  content: any;
  isReadOnly?: boolean;
}

export const NewsroomPage = ({ content, isReadOnly }: Props) => {
  const initialValue = content ?? [
    {
      type: "text",
      children: [{ text: "" }],
    },
  ];

  const editor = useEditor();

  const { handleAutoSave } = useAutoSave();

  const handleChange = (value: Descendant[]) => {
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
      isReadOnly={isReadOnly}
      initialValue={initialValue}
      onChange={handleChange}
    />
  );
};
