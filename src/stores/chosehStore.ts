import create from 'zustand'

interface ChosehStore {
  book?: {
    title: string
    citation: string
  }
}

export const [useChosehStore, chosehStoreApi] = create<ChosehStore>(set => ({
  book: null,
}))
