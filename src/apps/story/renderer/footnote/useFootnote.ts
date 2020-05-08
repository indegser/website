import create from 'zustand'
import { useEffect } from 'react'

const [useFootnoteStore] = create(set => ({
  array: [],
  add: (id: string) =>
    set(state => ({
      ...state,
      array: [...state.array, id],
    })),
}))

const useFootnote = (identifier: string, isDefinition?: boolean) => {
  const add = useFootnoteStore(s => s.add)
  const index = useFootnoteStore(s =>
    s.array.findIndex(id => id === identifier)
  )
  const defId = `cite-def-${identifier}`
  const refId = `cite-ref-${identifier}`

  useEffect(() => {
    // Register only happens on FootnoteReference
    !isDefinition && add(identifier)
  }, [])

  return {
    defId,
    refId,
    index: index + 1,
  }
}

export default useFootnote
