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
  color: var(--text300);
`

export const RectPrimaryButton = styled(Button)`
  border-radius: 4px;
  color: white;
  background: var(--primary100);
  height: 38px;
  padding-left: 16px;
  padding-right: 16px;
`
