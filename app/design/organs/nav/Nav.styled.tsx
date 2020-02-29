import styled from 'styled-components'
import { getColor } from 'design/atoms/colors/colorTypes'

export const NavMenuGrid = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  grid-gap: 0 20px;
`

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
