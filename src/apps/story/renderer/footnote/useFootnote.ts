import { useMemo } from 'react'
import { useStoryContext } from 'apps/story/Story.hooks'

const useFootnote = (isDefinition?: boolean) => {
  const { footnote } = useStoryContext()

  const index = useMemo(() => {
    return footnote.register(isDefinition)
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
