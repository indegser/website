import styled from 'styled-components'
import Box, { IBoxProps } from './Box'
import { grid, GridProps, alignItems, AlignItemsProps } from 'styled-system'
import { FC } from 'react'

const Base = styled(Box)`
  display: grid;
  ${grid};
  ${alignItems};
`

export interface IGridProps extends GridProps, IBoxProps, AlignItemsProps {}

const Grid: FC<IGridProps> = props => {
  return <Base {...props} />
}

export default Grid
