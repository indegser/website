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

interface Props {
  title: string
  content: string
  cover: string
  citation: string
}

const Choseh: React.FC<Props> = ({ title, content, cover, citation }) => {
  return (
    <PageContainer>
      <ChosehBox>
        <ChosehHeader>
          <ChosehTitle>{title}</ChosehTitle>
          <div className={styles.choseh_meta}>
            <div className={styles.choseh_avatar}>
              <img src={cover}></img>
            </div>
            <div className={styles.choseh_meta_info}>
              <div className={styles.choseh_cite}>{citation}</div>
              <div>May 21, 2018 · 9 min read</div>
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
            renderers={{
              footnoteDefinition: FootnoteDefinition,
              footnoteReference: FootnoteReference,
              image: ImageRenderer,
              heading: HeadingRenderer,
              thematicBreak: BreakRenderer,
              paragraph: ParagraphRenderer,
            }}
          />
        </ChosehContent>
        <Appendix />
      </ChosehBox>
    </PageContainer>
  )
}

export default Choseh
