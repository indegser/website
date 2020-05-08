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
  arrowDown = 'arrow-down',
  footnoteLink = 'footnote-link',
  close = 'close',
  more = 'more',
}

interface IIconProps {
  variant: keyof typeof IconVariant
  height?: number
  width?: number
  color?: string
  style?: object
}

const IconBox = styled.span`
  svg {
    display: block;
    fill: currentColor;
  }
`

const Icon: React.FC<IIconProps> = ({ variant, color, ...props }) => {
  const filename = IconVariant[variant]
  const Component = require(`./${filename}.svg`).default
  return (
    <IconBox style={{ color }}>
      <Component {...props} />
    </IconBox>
  )
}

export default Icon
