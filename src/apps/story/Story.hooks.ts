import { useRef, useContext, createContext, MutableRefObject } from 'react'

export const useFootnote = () => {
  const refCount = useRef<number>(0)
  const defCount = useRef<number>(0)

  const register = (isDef: boolean) => {
    let index: number
    if (isDef) {
      index = defCount.current += 1
    } else {
      index = refCount.current += 1
    }

    return index
  }

  return {
    refCount,
    defCount,
    register,
  }
}

interface StoryContext {
  footnote: ReturnType<typeof useFootnote>
}

export const StoryContext = createContext<StoryContext>(null)

export const useStoryContext = () => useContext(StoryContext)
