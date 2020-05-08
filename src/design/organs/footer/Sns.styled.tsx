import styled from 'styled-components'
import fontSizes from 'design/atoms/typography/fontSizes'

export const SnsBox = styled.div`
  align-self: center;
  font-size: ${fontSizes.xs};
  color: #666;
  padding: 4px;

  &:hover {
    color: #08f;
  }

  a {
    color: inherit;
  }
`
