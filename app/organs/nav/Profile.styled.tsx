import styled from 'styled-components'
import fontSizes from 'atoms/typography/fontSizes'
import { colorTokens } from 'atoms/colors/colorTypes'

export const ProfileName = styled.div`
  font-size: ${fontSizes.s};
`

export const ProfileRole = styled.div`
  font-size: ${fontSizes.xs};
  color: ${colorTokens.attr};
`
