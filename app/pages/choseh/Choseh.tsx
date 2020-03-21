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

interface Props {
  meta: {
    title: string
    cover: string
    citation: string
  }
  choseh: {
    edition: number
    content: string
    modifiedAt: number
  }
}

const Choseh: React.FC<Props> = ({ meta, choseh }) => {
  const { title, cover, citation } = meta
  const { content } = choseh

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
              <img alt={title} src={cover}></img>
            </div>
            <div className={styles.choseh_meta_info}>
              <div className={styles.choseh_cite}>{citation}</div>
              <ChosehEdition {...choseh} />
            </div>
          </div>
        </ChosehHeader>
        <Toc content={content} />
        <ChosehContent>
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
        </ChosehContent>
        <Appendix />
      </ChosehBox>
    </PageContainer>
  )
}

export default Choseh
