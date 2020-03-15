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
          <Markdown
            source={content}
            renderers={{
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
