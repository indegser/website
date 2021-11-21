import { css } from "@emotion/css";
import { KeyboardEventHandler, useCallback, useEffect, useRef } from "react";
import { colors } from "style.types";
import { useEditor } from "./Editor.hooks";

interface Props {
  id: string;
  onAppendBlock: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Block = ({ id, onAppendBlock, onDelete }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const htmlRef = useRef<string>("");
  const previousKeyRef = useRef<string>();
  const isActive = useEditor((s) => s.activeBlockId === id);

  useEffect(() => {
    if (isActive) {
      const range = new Range();
      const target = ref.current.hasChildNodes()
        ? ref.current.lastChild
        : ref.current;

      range.setStart(target, target.textContent.length);
      range.collapse(true);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  }, [isActive, id]);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const html = ref.current.innerHTML;

      switch (e.key) {
        case "Enter": {
          if (e.shiftKey) break;
          e.preventDefault();
          onAppendBlock(id);
          break;
        }
        case "Backspace": {
          if (html && html !== "<br>") break;
          e.preventDefault();
          onDelete(id);
          break;
        }
        case "ArrowUp": {
          const range = getSelection().getRangeAt(0);
          const rangeRect = range.getBoundingClientRect();
          const boxRect = ref.current.getBoundingClientRect();
          const isFirstLine = boxRect.top + rangeRect.height > rangeRect.top;

          if (!isFirstLine) break;

          e.preventDefault();

          break;
        }
      }

      previousKeyRef.current = e.key;
    },
    []
  );

  return (
    <div>
      <div
        ref={ref}
        contentEditable
        dangerouslySetInnerHTML={{ __html: htmlRef.current }}
        className={blockClassName}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

const blockClassName = css`
  outline: none;
  /* border: 1px solid ${colors.gray200}; */
`;
