import { useMemo } from 'react'
import { useStoryContext } from 'apps/story/Story.hooks'

const useFootnote = (isDefinition?: boolean) => {
  const { footnote } = useStoryContext()
  const ref = isDefinition ? footnote.defCount : footnote.refCount

  const index = useMemo(() => {
    ref.current += 1
    return ref.current
  }, [])

  const defId = `cite-def-${index}`
  const refId = `cite-ref-${index}`

  return {
    defId,
    refId,
    index,
  }
}

export default useFootnote
