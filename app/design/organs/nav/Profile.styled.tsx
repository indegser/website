import styled from 'styled-components'
import fontSizes from 'design/atoms/typography/fontSizes'
import { colorTokens } from 'design/atoms/colors/colorTypes'

export const ProfileName = styled.div`
  font-size: ${fontSizes.s};
  text-align: right;
`

export const ProfileRole = styled.div`
  font-size: ${fontSizes.xs};
  color: ${colorTokens.attr};
  text-align: right;
`

export const ProfileAvatarButton = styled.div`
  cursor: pointer;
`
