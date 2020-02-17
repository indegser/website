import React from 'react'

export const iconPaths = {
  logo: 'logo',
  facebookLogo: 'facebook-logo',
  googleLogo: 'google-logo',
  githubLogo: 'github-logo',
}

interface IIconProps {
  variant: keyof typeof iconPaths
  height?: number
  width?: number
}

const Icon: React.FC<IIconProps> = ({ variant, ...props }) => {
  const path = iconPaths[variant]

  if (!path) return null

  const Component = require(`./${path}.svg`).default
  return <Component {...props} />
}

export default Icon
