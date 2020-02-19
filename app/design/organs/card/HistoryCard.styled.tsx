import styled from 'styled-components'
import CircleImage from 'design/atoms/image/CircleImage'
import TitleText from 'design/atoms/typography/TitleText'
import { getColor } from 'design/atoms/colors/colorTypes'
import BodyText from 'design/atoms/typography/BodyText'

export const HistoryCardContainer = styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
`

export const HistoryCardImages = styled.div`
  position: relative;
`

export const HistoryCardImage = styled(CircleImage)`
  width: 60px;
  height: 60px;
`

export const HistoryCardComment = styled(BodyText)`
  color: ${getColor('bodyTextComment')};
`

export const HistoryCardTitle = styled(TitleText)`
  &:hover {
    color: ${getColor('textLinkColor')};
  }
`
