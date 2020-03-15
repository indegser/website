import PageContainer from 'design/atoms/container/PageContainer'
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

interface Props {
  title: string
  content: string
}

const Choseh: React.FC<Props> = ({ title, content }) => {
  return (
    <PageContainer>
      <ChosehBox>
        <ChosehHeader>
          <ChosehTitle>{title}</ChosehTitle>
        </ChosehHeader>
        <ChosehContent>
          <Toc content={content} />
          <Markdown
            source={content}
            renderers={{
              heading: HeadingRenderer,
              thematicBreak: BreakRenderer,
              paragraph: ParagraphRenderer,
            }}
          />
        </ChosehContent>
      </ChosehBox>
    </PageContainer>
  )
}

export default Choseh
