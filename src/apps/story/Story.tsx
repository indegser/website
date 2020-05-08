import PageContainer from 'design/atoms/container/PageContainer'
import Markdown from 'react-markdown'
import { default as c } from './Story.styled'
import ParagraphRenderer from './renderer/ParagraphRenderer'
import BreakRenderer from './renderer/BreakRenderer'
import Toc from './toc/Toc'
import HeadingRenderer from './renderer/HeadingRenderer'
import ImageRenderer from './renderer/ImageRenderer'
import FootnoteDefinition from './renderer/footnote/FootnoteDefinition'
import FootnoteReference from './renderer/footnote/FootnoteReference'
import Appendix from './Appendix'
import shortcodes from 'remark-shortcodes'
import Gist from './renderer/Gist'
import { IStory } from 'types/dataTypes'
import { useMemo } from 'react'
import matter from 'gray-matter'
import Headline from './Headline'

interface Props {
  story: IStory
}

const Story: React.FC<Props> = ({ story }) => {
  const content = useMemo(() => {
    const { content } = matter(story.content)
    return content
  }, [])

  const shortcodeMap = {
    gist: Gist,
  }

  return (
    <PageContainer>
      <c.Container>
        <Headline data={story.data} />
        <Toc content={content} />
        <c.Content>
          <Markdown
            source={content}
            parserOptions={{
              footnotes: true,
            }}
            plugins={[shortcodes]}
            renderers={{
              footnoteDefinition: FootnoteDefinition,
              footnoteReference: FootnoteReference,
              image: ImageRenderer,
              heading: HeadingRenderer,
              thematicBreak: BreakRenderer,
              paragraph: ParagraphRenderer,
              shortcode: ({ identifier, attributes: props }) => {
                const Renderer = shortcodeMap[identifier]
                if (!Renderer) return null
                return <Renderer {...props} />
              },
            }}
          />
        </c.Content>
        <Appendix />
      </c.Container>
    </PageContainer>
  )
}

export default Story
