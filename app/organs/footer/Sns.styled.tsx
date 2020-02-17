import styled from 'styled-components'
import fontSizes from 'atoms/typography/fontSizes'
import { getColor } from 'atoms/colors/colorTypes'

export const SnsBox = styled.div`
  align-self: center;
  font-size: ${fontSizes.xs};
  color: ${getColor('attr')};
  padding: 4px;

  &:hover {
    color: ${getColor('interactive1')};
  }

  a {
    color: inherit;
  }
`
