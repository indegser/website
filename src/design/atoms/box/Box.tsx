import styled from 'styled-components'
import { space, SpaceProps, border, BorderProps } from 'styled-system'
import { HTMLProps, FC } from 'react'

export interface IBoxProps
  extends SpaceProps,
    BorderProps,
    HTMLProps<HTMLDivElement> {}

const Box: FC<IBoxProps> = styled.div`
  box-sizing: border-box;
  ${space};
  ${border}
`

export default Box
