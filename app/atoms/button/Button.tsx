import styled from 'styled-components'
import { getColor } from 'atoms/colors/colorTypes'

const Button = styled.button`
  font-size: 100%;
  font-family: inherit;
  border: 0;
  padding: 0;
  padding: 6px 8px;
  font-size: 14px;
  cursor: pointer;
`

export const PrimaryButton = styled(Button)`
  border-radius: 4px;
  color: white;
  background: ${getColor('baseButtonBg')};
  box-shadow: 1px 1px 7px ${getColor('baseButtonBoxShadowLower')},
    -1px -1px 6px ${getColor('baseButtonBoxShadowUpper')};

  &:hover {
    background: linear-gradient(145deg, #ffffff, #d7d7d7);
    box-shadow: 4px 4px 7px #dcdcdc, -4px -4px 7px #ffffff;
  }
`
