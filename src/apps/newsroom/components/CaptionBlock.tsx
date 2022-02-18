import { styled, theme } from "common/stitches.config";
import { Descendant, Node, Path, Transforms } from "slate";
import { Editable, ReactEditor, Slate } from "slate-react";
import { useEditor } from "../hooks/useEditor";
import { TextLeaf } from "./TextLeaf";

interface Props {
  parentElement: Node;
  parentEditor: ReactEditor;
}

const INITIAL_CAPTION: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
];

export const CaptionBlock = ({ parentElement, parentEditor }: Props) => {
  const editor = useEditor(undefined, true);
  const isReadOnly = ReactEditor.isReadOnly(parentEditor);

  const getPath = () => {
    return ReactEditor.findPath(parentEditor, parentElement);
  };

  if (!("caption" in parentElement)) {
    return null;
  }

  const { caption } = parentElement;
  const textNode = caption?.children?.[0];
  const hasContent = textNode && Node.string(caption?.children?.[0]) !== "";

  if (!hasContent && isReadOnly) return null;

  return (
    <Container>
      <Slate
        editor={editor}
        value={caption.children ?? INITIAL_CAPTION}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );

          if (!isAstChange) return;

          const path = getPath();

          Transforms.setNodes(
            parentEditor,
            { caption: { isEnabled: true, children: value } },
            { at: path }
          );
        }}
      >
        <Editable
          readOnly={ReactEditor.isReadOnly(parentEditor)}
          placeholder="캡션을 달아주세요"
          renderLeaf={TextLeaf}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();

              ReactEditor.focus(parentEditor);
              Transforms.select(parentEditor, getPath());
              parentEditor.insertBreak();
            }
          }}
        />
      </Slate>
    </Container>
  );
};

const Container = styled("div", {
  fontSize: "0.85em",
  color: theme.colors.fgSubtle,
});
