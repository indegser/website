import create from 'zustand'

interface IContextMenuStore {
  parent: React.MutableRefObject<HTMLElement>
  // setParent: (parent: IContextMenuStore['parent']) => void;
}

export const [useContextMenuStore] = create<IContextMenuStore>(set => ({
  parent: null,
  // setParent: parent => void,
}))
