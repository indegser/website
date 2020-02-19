import styled from 'styled-components'
import { getColor } from '../colors/colorTypes'

const TitleText = styled.span`
  color: ${getColor('textPrimary')};
  font-size: 14px;
  line-height: 16px;
  vertical-align: middle;
  font-weight: 600;
`

export default TitleText
