import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import { HTMLProps, FC } from 'react'

export interface IBoxProps extends SpaceProps, HTMLProps<HTMLDivElement> {}

const Box: FC<IBoxProps> = styled.div`
  box-sizing: border-box;
  ${space};
`

export default Box
