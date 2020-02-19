import styled from 'styled-components'
import CircleImage from 'design/atoms/image/CircleImage'
import TitleText from 'design/atoms/typography/TitleText'
import { getColor } from 'design/atoms/colors/colorTypes'

export const HistoryCardContainer = styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
`

export const HistoryCardImages = styled.div`
  position: relative;
`

export const HistoryCardFavicon = styled(CircleImage)`
  width: 30px;
  height: 30px;
  object-fit: initial;
`

export const HistoryCardImage = styled(CircleImage)`
  width: 60px;
  height: 60px;
`

export const HistoryCardTitle = styled(TitleText)`
  &:hover {
    color: ${getColor('textLinkColor')};
  }
`
