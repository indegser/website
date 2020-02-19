import styled from 'styled-components'
import fontSizes from 'design/atoms/typography/fontSizes'
import { getColor } from 'design/atoms/colors/colorTypes'

export const FooterBox = styled.footer`
  font-size: 13px;
  margin-top: 32px;
`

export const FooterCopyright = styled.div`
  font-size: 13px;
  color: ${getColor('attr')};
  margin-right: 8px;
`
