import styled from 'styled-components'
import CircleImage from 'design/atoms/image/CircleImage'
import TitleText from 'design/atoms/typography/TitleText'
import { getColor } from 'design/atoms/colors/colorTypes'
import BodyText, { Short1BodyText } from 'design/atoms/typography/BodyText'

export const HistoryCardContainer = styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;
`

export const HistoryCardImage = styled(CircleImage)`
  width: 48px;
  height: 48px;
  background: #eee;
`

export const HistoryCardComment = styled(BodyText)`
  color: ${getColor('textPrimary')};
`

export const HistoryCardTitle = styled(TitleText)``

export const HistoryCardBody = styled(Short1BodyText)`
  margin: 0;
`
