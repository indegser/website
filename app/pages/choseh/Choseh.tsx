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
import { dateFns } from 'utils/dateUtils'
import ChosehEdition from './ChosehEdition'

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
  const { content, modifiedAt, edition } = choseh

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
