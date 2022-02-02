import { Descendant } from "slate";
import { useEditor } from "./hooks/useEditor";
import { useAutoSave } from "./NewsroomPage.hooks";
import { Renderer } from "./Renderer";

interface Props {
  content: Descendant[];
  isReadOnly?: boolean;
}

export const NewsroomPage = ({ content, isReadOnly }: Props) => {
  const initialValue: Descendant[] = content ?? [
    {
      type: "title",
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
