import styled from '@emotion/styled'

const Button = styled.button`
  font-size: 100%;
  font-family: inherit;
  border: 0;
  padding: 0;
  padding: 0px 8px;
  font-size: 15px;
  height: 34px;
  line-height: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: transparent;
  color: var(--text300);
  transition: 0.2s color ease;
  &:hover {
    color: var(--text400);
  }
`

export const PrimaryButton = styled(Button)`
  border-radius: 4px;
`

export const SecondaryButton = styled(Button)`
  border-radius: 4px;
  color: var(--text300);
`
