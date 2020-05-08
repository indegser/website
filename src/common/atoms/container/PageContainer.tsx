import styled from '@emotion/styled'
import { mq } from 'common/theme'

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 48px;

  ${mq(840)} {
    & {
      padding: 0 32px;
    }
  }

  ${mq(640)} {
    & {
      padding: 0 16px;
    }
  }
`

export default PageContainer
