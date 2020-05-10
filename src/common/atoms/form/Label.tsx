import { FC, HTMLProps } from 'react'
import styled from '@emotion/styled'

const Box = styled.div`
  margin-bottom: 8px;
  color: var(--text300);
`

const Optional = styled.span`
  color: var(--text200);
  font-size: 12px;
  vertical-align: bottom;
  margin: 0 4px;
  font-weight: 400;
`

interface Props extends HTMLProps<HTMLLabelElement> {
  required?: boolean
  label: string
}

const Label: FC<Props> = ({ label, required, ...props }) => {
  return (
    <Box>
      <label {...props}>
        <span>{label}</span>
        {!required && <Optional>(선택사항)</Optional>}
      </label>
    </Box>
  )
}

export default Label
