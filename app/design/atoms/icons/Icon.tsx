import React from 'react'
import styled from 'styled-components'

export const iconPaths = {
  logo: 'logo',
  facebook: 'facebook-logo',
  google: 'google-logo',
  github: 'github-logo',
  twitter: 'twitter-logo',
  logoSimple: 'logo-simple',
}

interface IIconProps {
  variant: keyof typeof iconPaths
  height?: number
  width?: number
  color?: string
}

const IconBox = styled.div`
  svg {
    display: block;
    fill: currentColor;
    stroke: currentColor;
  }
`

const Icon: React.FC<IIconProps> = ({ variant, color, ...props }) => {
  const path = iconPaths[variant]

  if (!path) return null

  const Component = require(`./${path}.svg`).default
  return (
    <IconBox style={{ color }}>
      <Component {...props} />
    </IconBox>
  )
}

export default Icon
