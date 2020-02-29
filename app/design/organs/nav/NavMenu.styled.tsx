import styled from 'styled-components'

export const NavMenuBox = styled.div`
  font-size: 14px;
  color: #333;
  padding: 4px 8px;
  display: flex;
  align-items: center;

  &[aria-current='true'] {
    color: #777;
    pointer-events: none;
  }
`

export const NavMenuName = styled.div`
  margin-left: 8px;
`
