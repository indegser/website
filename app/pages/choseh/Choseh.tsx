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

const c = `

> Straight photography. 한 장의 사진이 만들어지는 과정에서 모든 것이 자연 그대로인 사진. 순수사진의 조건은 예술적 의미를 갖되 그것이 과하지 않고, 피사체를 강조하지도, 작가의 욕심을 드러내지도 않는 현실 그 자체이다. [원문](http://seoulphoto.com/bbs/board.php?bo_table=1_study_4&wr_id=15&sfl=&stx=&sst=wr_datetime&sod=desc&sop=and&page=2)

![Hello](https://lh3.googleusercontent.com/proxy/LmBjcVoQl6sgJf2vj9MIA1ajQK81XImI5voYcfrVbKuWgt7_Uum4PrbN4KtDLD3XU5FUx7S7j6SeyY8IrQ2ope2x6ni70NOIXy333Edi8_TWBjmlOicvEKT2A5iRTNs)

# 36

헤로도토스는 '세계사'를 썼다. ... 페르시아 전쟁은 '서로 다른 문명의 충돌'이었다. 그런데도 헤로도토스는 그리스를 편애하지 않았다. 인류의 일원으로서 '위대하고도 놀라운 업적'을 이룩한 두 문명의 면모를 ... 차별 없이 서술했다.

---

투키디데스는 ... 펠로폰네소스 전쟁 그 자체뿐만 아니라 그리스의 수많은 도시국가에서 벌어진 내란 상황도 면밀하게 관찰한 것이다. ... 다음은 내란이 불러들인 공동체의 붕괴 현상을 묘사한 대목인데, 마치 현대 정치의 일상적 풍경을 보여주는 것 같다.
`

const Choseh: React.FC<Props> = ({ title, content }) => {
  return (
    <PageContainer>
      <ChosehBox>
        <ChosehHeader>
          <ChosehTitle>{title}</ChosehTitle>
        </ChosehHeader>
        <ChosehContent>
          <Markdown
            source={c}
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
