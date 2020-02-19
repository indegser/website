import React from 'react'
import styled from 'styled-components'
import Box, { IBoxProps } from './Box'
import { flexbox, FlexboxProps } from 'styled-system'

export interface IFlexboxProps extends IBoxProps, FlexboxProps {}

const Base = styled(Box)`
  display: flex;
  ${flexbox};
`

const Flexbox = props => {
  return <Base {...props} />
}

export default Flexbox
