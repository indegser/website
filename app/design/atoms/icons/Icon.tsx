import React from 'react'
import styled from 'styled-components'

export enum IconVariant {
  logo = 'logo',
  facebook = 'facebook-logo',
  google = 'google-logo',
  github = 'github-logo',
  twitter = 'twitter-logo',
  logoSimple = 'logo-simple',
  link = 'link',
}

interface IIconProps {
  variant: IconVariant
  height?: number
  width?: number
  color?: string
}

const IconBox = styled.div`
  svg {
    display: block;
    fill: currentColor;
  }
`

const Icon: React.FC<IIconProps> = ({ variant, color, ...props }) => {
  const Component = require(`./${variant}.svg`).default
  return (
    <IconBox style={{ color }}>
      <Component {...props} />
    </IconBox>
  )
}

export default Icon
