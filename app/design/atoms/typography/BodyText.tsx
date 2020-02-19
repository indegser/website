import React, { useMemo } from 'react'
import styled from 'styled-components'
import { getColor } from 'design/atoms/colors/colorTypes'

export enum BodyTextTypes {
  Short1,
  Short2,
  Long1,
  Long2,
}

const BaseBodyText = styled.p`
  margin: 0;
  word-break: break-word;
  color: ${getColor('bodyTextPrimary')};
`

const Short1BodyText = styled(BaseBodyText)`
  font-size: 0.8rem;
  line-height: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.16px;
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
