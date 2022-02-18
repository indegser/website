import { styled, theme } from "common/stitches.config";
import { ComponentProps } from "react";
import { Descendant } from "slate";
import { Editable, Slate } from "slate-react";
import { useEditor } from "../hooks/useEditor";
import { TextLeaf } from "./TextLeaf";

interface Props
  extends Omit<ComponentProps<typeof Slate>, "children" | "editor"> {
  editableProps?: ComponentProps<typeof Editable>;
  onSubmit: (value: Descendant[]) => void;
}

export const CaptionBlock = ({ editableProps, onSubmit, ...props }: Props) => {
  const editor = useEditor(undefined, true);
  return (
    <Container>
      <Slate editor={editor} {...props}>
        <Editable
          {...editableProps}
          placeholder="캡션을 달아주세요"
          renderLeaf={TextLeaf}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const value = editor.children;
              onSubmit(value);
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
