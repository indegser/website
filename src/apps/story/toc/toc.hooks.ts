import unified from 'unified'
import markdown from 'remark-parse'
import compiler from 'remark-stringify'
import unistMap from 'unist-util-map'
import toc from 'mdast-util-toc'
import { useMemo, useState } from 'react'
import useMeasure from 'react-use-measure'
import { useSpring } from 'react-spring'

export const useTocFold = () => {
  const [fold, setFold] = useState<boolean>(true)
  const toggleFold = () => {
    setFold(!fold)
  }

  return {
    fold,
    title: fold ? 'Table of Contents' : 'Fold',
    toggleFold,
  }
}

export const useAnimatedFold = (fold: boolean) => {
  const [ref, bounds] = useMeasure()
  const style = useSpring({ maxHeight: fold ? 0 : bounds.height + 16 })

  return { ref, style }
}

export const useTocContent = (content: string) => {
  const tocContent = useMemo(() => {
    const tree = unified().use(markdown, { footnotes: true }).parse(content)

    const tocTree = toc(tree)

    if (!tocTree.map) {
      return null
    }

    const tocNode = unistMap(tocTree.map, (node) => {
      if (node.type === 'list') {
        return {
          ...node,
          ordered: true,
        }
      }
      return node
    })

    const parsed = unified().use(compiler).stringify(tocNode)

    return parsed
  }, [content])

  return tocContent
}
