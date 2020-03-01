import styled from 'styled-components'
import CircleImage from 'design/atoms/image/CircleImage'
import TitleText from 'design/atoms/typography/TitleText'
import { getColor } from 'design/atoms/colors/colorTypes'
import BodyText, { Short1BodyText } from 'design/atoms/typography/BodyText'
import { CardMoreBox } from './CardMore.styled'
import { mediaQuery } from 'design/theme'

export const HistoryCardContainer = styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;

  ${CardMoreBox} {
    display: none;
  }

  &:hover {
    ${CardMoreBox} {
      display: block;
    }
  }
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

export const HistoryCardBody = styled(Short1BodyText)`
  margin: 0;
`
