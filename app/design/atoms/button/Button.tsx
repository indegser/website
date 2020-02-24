import styled from 'styled-components'
import { getColor } from 'design/atoms/colors/colorTypes'

const Button = styled.button`
  font-size: 100%;
  font-family: inherit;
  border: 0;
  padding: 0;
  padding: 0px 8px;
  font-size: 14px;
  height: 32px;
  line-height: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const PrimaryButton = styled(Button)`
  border-radius: 4px;
  color: white;
  background: ${getColor('baseButtonPrimary')};
`

export const SecondaryButton = styled(Button)`
  border-radius: 4px;
  background: ${getColor('baseButtonBg')};
`
