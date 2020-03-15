import unified from 'unified'
import markdown from 'remark-parse'
import compiler from 'remark-stringify'
import unistMap from 'unist-util-map'
import toc from 'mdast-util-toc'

const useToc = (content: string) => {
  const parseToc = () => {
    const tree = unified()
      .use(markdown, { footnotes: true })
      .parse(content)

    const tocTree = toc(tree)

    const tocNode = unistMap(tocTree.map, node => {
      if (node.type === 'list') {
        return {
          ...node,
          ordered: true,
        }
      }
      return node
    })

    const parsed = unified()
      .use(compiler)
      .stringify(tocNode)

    return parsed
  }

  return {
    parseToc,
  }
}

export default useToc
