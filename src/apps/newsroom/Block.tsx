import styled from "@emotion/styled";
import {
  forwardRef,
  KeyboardEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Node } from "slate";
import { colors } from "style.types";
import { useEditor } from "./Editor.hooks";

interface Props {
  id: string;
  onAppendBlock: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Block = forwardRef<HTMLDivElement>(
  ({ id, children }: PropsWithChildren<Props>, ref) => {
    const htmlRef = useRef<string>("");
    const previousKeyRef = useRef<string>();
    const isActive = useEditor((s) => s.activeBlockId === id);
    const [isEmpty, setIsEmpty] = useState(true);

    // useEffect(() => {
    //   if (isActive) {
    //     const range = new Range();
    //     const target = ref.current.hasChildNodes()
    //       ? ref.current.lastChild
    //       : ref.current;

    //     range.setStart(target, target.textContent.length);
    //     range.collapse(true);
    //     window.getSelection().removeAllRanges();
    //     window.getSelection().addRange(range);
    //   }
    // }, [isActive, id]);

    // const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    //   (e) => {
    //     const html = ref.current.innerHTML;

    //     switch (e.key) {
    //       case "Enter": {
    //         if (!e.ctrlKey && !e.metaKey) break;
    //         e.preventDefault();
    //         onAppendBlock(id);
    //         break;
    //       }
    //       case "Backspace": {
    //         if (html && html !== "<br>") break;
    //         e.preventDefault();
    //         onDelete(id);
    //         break;
    //       }
    //       case "ArrowUp": {
    //         const range = getSelection().getRangeAt(0);
    //         const rangeRect = range.getBoundingClientRect();
    //         const boxRect = ref.current.getBoundingClientRect();
    //         const isFirstLine = boxRect.top + rangeRect.height > rangeRect.top;

    //         break;
    //       }
    //     }

    //     previousKeyRef.current = e.key;
    //   },
    //   []
    // );

    // const handleInput = () => {
    //   const nextIsEmpty = ref.current.innerText.length === 0;
    //   if (nextIsEmpty !== isEmpty) {
    //     setIsEmpty(nextIsEmpty);
    //   }
    // };

    return <Container ref={ref}>{children}</Container>;
  }
);
{
  /* <Space
  ref={ref}
  contentEditable
  placeholder="Type text, then shift-return. control-space for more options."
  dangerouslySetInnerHTML={{ __html: htmlRef.current }}
  onKeyDown={handleKeyDown}
  onInput={handleInput}
/> */
}

const Container = styled.div`
  position: relative;

  & + & {
    margin-top: 1em;
  }
`;

const Space = styled.div`
  outline: none;
  position: relative;
`;

const Placeholder = styled.div`
  color: ${colors.gray200};
  font-weight: 400;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  user-select: none;
`;
