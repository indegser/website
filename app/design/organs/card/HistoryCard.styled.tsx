import styled from 'styled-components'
import CircleImage from 'design/atoms/image/CircleImage'
import TitleText from 'design/atoms/typography/TitleText'
import { getColor } from 'design/atoms/colors/colorTypes'
import BodyText from 'design/atoms/typography/BodyText'
import { CardMoreBox } from './CardMore.styled'

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

export const HistoryCardBody = styled.p`
  margin: 0;
  word-break: break-word;
  color: var(--bodyTextPrimary);
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 400;
  text-indent: 12px;
  text-align: justify;
  word-break: break-all;
  -webkit-letter-spacing: 0.16px;
  -moz-letter-spacing: 0.16px;
  -ms-letter-spacing: 0.16px;
  letter-spacing: 0.16px;
`
