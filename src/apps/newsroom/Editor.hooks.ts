import { uid } from "uid";
import create, { State } from "zustand";

interface EditorState extends State {
  blocks: Array<{ id: string }>;
  activeBlockId: string | null;
  appendBlock: (prevBlockId: string) => void;
  deleteBlocks: (blockIds: string[]) => void;
  focusUp: (baseBlockId: string) => void;
  focusDown: (baseBlockId: string) => void;
}

export const useEditor = create<EditorState>((set, get) => ({
  blocks: [{ id: uid() }],
  activeBlockId: null,
  focusUp: (baseBlockId) => {
    const { blocks } = get();
    const baseBlockIndex = blocks.findIndex(
      (block) => block.id === baseBlockId
    );
    const focusBlock = blocks[baseBlockIndex - 1];
    set({ activeBlockId: focusBlock?.id ?? null });
  },
  focusDown: (baseBlockId) => {
    const { blocks } = get();
    const baseBlockIndex = blocks.findIndex(
      (block) => block.id === baseBlockId
    );
    const focusBlock = blocks[baseBlockIndex + 1];
    set({ activeBlockId: focusBlock?.id ?? null });
  },
  appendBlock: (prevBlockId) => {
    const { blocks } = get();
    const prevBlockIndex = blocks.findIndex(
      (block) => block.id === prevBlockId
    );

    const id = uid();

    set({
      blocks: [
        ...blocks.slice(0, prevBlockIndex + 1),
        { id },
        ...blocks.slice(prevBlockIndex + 1),
      ],
      activeBlockId: id,
    });
  },
  deleteBlocks: (blockIds) => {
    const { blocks } = get();
    const activeBlockId =
      blockIds.length > 1
        ? null
        : blocks[blocks.findIndex((block) => blockIds.includes(block.id)) - 1]
            .id;
    set({
      activeBlockId,
      blocks: blocks.filter((block) => !blockIds.includes(block.id)),
    });
  },
}));
