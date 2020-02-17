import styled from 'styled-components'
import { getColor } from 'atoms/colors/colorTypes'

export const NavMenus = styled.div`
  display: flex;
  height: 54px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  border-bottom: 1px solid ${getColor('borderLighter')};
`

export const NavHomeLogo = styled.div`
  svg {
    display: block;
  }
`
