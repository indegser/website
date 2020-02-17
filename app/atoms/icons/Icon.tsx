import React from 'react'
import styled from 'styled-components'

export const iconPaths = {
  logo: 'logo',
  facebook: 'facebook-logo',
  google: 'google-logo',
  github: 'github-logo',
  twitter: 'twitter-logo',
}

interface IIconProps {
  variant: keyof typeof iconPaths
  height?: number
  width?: number
}

const IconBox = styled.div`
  svg {
    display: block;
  }
`

const Icon: React.FC<IIconProps> = ({ variant, ...props }) => {
  const path = iconPaths[variant]

  if (!path) return null

  const Component = require(`./${path}.svg`).default
  return (
    <IconBox>
      <Component {...props} />
    </IconBox>
  )
}

export default Icon
