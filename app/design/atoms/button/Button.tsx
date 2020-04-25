import styled from 'styled-components'

const Button = styled.button`
  font-size: 100%;
  font-family: inherit;
  border: 0;
  padding: 0;
  padding: 0px 8px;
  font-size: 14px;
  height: 38px;
  line-height: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const PrimaryButton = styled(Button)`
  border-radius: 4px;
  color: white;
  background: #08f;
`

export const SecondaryButton = styled(Button)`
  border-radius: 4px;
  background: #ddd;
`
