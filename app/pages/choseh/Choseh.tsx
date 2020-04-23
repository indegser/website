import PageContainer from 'design/atoms/container/PageContainer'
import styles from './Choseh.module.scss'
import Markdown from 'react-markdown'
import {
  ChosehBox,
  ChosehHeader,
  ChosehTitle,
  ChosehContent,
} from './Choseh.styled'
import ParagraphRenderer from './renderer/ParagraphRenderer'
import BreakRenderer from './renderer/BreakRenderer'
import Toc from './toc/Toc'
import HeadingRenderer from './renderer/HeadingRenderer'
import ImageRenderer from './renderer/ImageRenderer'
import FootnoteDefinition from './renderer/footnote/FootnoteDefinition'
import FootnoteReference from './renderer/footnote/FootnoteReference'
import Appendix from './Appendix'
import shortcodes from 'remark-shortcodes'
import ChosehEdition from './ChosehEdition'
import Gist from './renderer/Gist'
import { IStory } from 'types/dataTypes'

interface Props {
  story: IStory
}

const Choseh: React.FC<Props> = ({ story }) => {
  const { title, coverUrl, coverAlt } = story.frontMatter

  const shortcodeMap = {
    gist: Gist,
  }

  return (
    <PageContainer>
      <ChosehBox>
        <ChosehHeader>
          <ChosehTitle>{title}</ChosehTitle>
          <div className={styles.choseh_meta}>
            <div className={styles.choseh_avatar}>
              <img alt={coverAlt} src={coverUrl}></img>
            </div>
            <div className={styles.choseh_meta_info}>
              <div className={styles.choseh_cite}>{}</div>
              <ChosehEdition edition={1} modifiedAt={story.modifiedAt} />
            </div>
          </div>
        </ChosehHeader>
        <Toc content={story.content} />
        <ChosehContent>
          <Markdown
            source={story.content}
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
        </ChosehContent>
        <Appendix />
      </ChosehBox>
    </PageContainer>
  )
}

export default Choseh
