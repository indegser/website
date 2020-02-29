import styled from 'styled-components'
import { getColor } from '../colors/colorTypes'

export const CitationText = styled.span`
  font-size: 13px;
  line-height: 15px;
  vertical-align: middle;
  color: ${getColor('textLabelColor')};
`
