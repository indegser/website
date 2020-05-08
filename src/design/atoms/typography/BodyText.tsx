import React, { useMemo } from 'react'
import styled from 'styled-components'
import { mediaQuery } from 'design/theme'

export enum BodyTextTypes {
  Short1,
  Short2,
  Long1,
  Long2,
}

const BaseBodyText = styled.p`
  margin: 0;
  word-break: break-word;
  color: #1a202f;
`

export const Short1BodyText = styled(BaseBodyText)`
  font-size: 13px;
  line-height: 1.55;
  font-weight: 400;

  ${mediaQuery.lessThan('small')`
    font-size: 15px;
  `}
`

const Short2BodyText = styled(BaseBodyText)``

const Long1BodyText = styled(BaseBodyText)`
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.16px;
`

const Long2BodyText = styled(BaseBodyText)``

const variantMap = {
  [BodyTextTypes.Short1]: Short1BodyText,
  [BodyTextTypes.Short2]: Short2BodyText,
  [BodyTextTypes.Long1]: Long1BodyText,
  [BodyTextTypes.Long2]: Long2BodyText,
}

const BodyText: React.FC<{ variant: BodyTextTypes }> = ({
  variant,
  ...props
}) => {
  const Component = useMemo(() => variantMap[variant], [variant])
  return <Component {...props} />
}

export default BodyText
