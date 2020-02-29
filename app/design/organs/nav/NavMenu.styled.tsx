import styled from 'styled-components'

export const NavMenuBox = styled.div`
  font-size: 15px;
  color: #333;
  padding: 4px 0px;
  padding-right: 8px;
  display: flex;
  align-items: center;

  &[aria-current='true'] {
    color: #777;
    pointer-events: none;
  }
`

export const NavMenuName = styled.div``

export const NavMenuLogo = styled.div`
  margin-right: 16px;
`
