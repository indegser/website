import PageContainer from 'common/atoms/container/PageContainer'
import Markdown from 'react-markdown'
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
import { mq } from 'common/theme'
import styled from '@emotion/styled'
import { useFootnote, StoryContext } from './Story.hooks'

interface Props {
  story: IStory
}

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
`

const Content = styled.div`
  text-align: left;

  font-size: 17px;
  line-height: 1.67;
  word-break: break-all;
  text-align: justify;
  padding: 24px 0;

  ${mq('sm')} {
    font-size: 16px;
    line-height: 1.67;
  }

  strong {
    font-weight: 600;
  }

  blockquote {
    margin-left: 0;
    margin-right: 0;
  }

  sup {
    line-height: 1;
    padding: 0 2px;
    font-size: 80%;
  }
`

const Story: React.FC<Props> = ({ story }) => {
  const footnote = useFootnote()

  const content = useMemo(() => {
    const { content } = matter(story.content)
    return content
  }, [])

  const shortcodeMap = {
    gist: Gist,
  }

  return (
    <StoryContext.Provider value={{ footnote }}>
      <PageContainer>
        <Container>
          <Headline data={story.data} />
          <Toc content={content} />
          <Content>
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
          </Content>
          <Appendix />
        </Container>
      </PageContainer>
    </StoryContext.Provider>
  )
}

export default Story
