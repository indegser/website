import styled from 'styled-components'
import { getColor } from '../colors/colorTypes'

export const CMBox = styled.div`
  position: fixed;
  z-index: 999;
`

export const CMContent = styled.div`
  background: white;
  padding: 4px 0;
  background: rgba(86, 86, 86, 0.84);
  backdrop-filter: saturate(180%) blur(20px);
  color: white;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.13);
  border-radius: 8px;
  font-size: 14px;
`

export const CMItem = styled.div`
  padding: 4px 16px;

  &:hover {
    background-color: ${getColor('interactive1')};
  }
`
