import styled, { css } from 'styled-components'
import { getColor } from '../colors/colorTypes'
import { mediaQuery } from 'design/theme'

const TitleText = styled.span`
  color: ${getColor('textPrimary')};
  font-size: 14px;
  line-height: 16 / 14;
  vertical-align: middle;
  font-weight: 600;

  ${mediaQuery.lessThan('small')`
    font-size: 16px;
  `}
`

export default TitleText
