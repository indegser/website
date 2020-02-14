import React from 'react'

export enum IconType {
  Logo = 'logo',
}

interface IIconProps {
  variant: IconType
  height?: number
  width?: number
}

const Icon: React.FC<IIconProps> = ({ variant, ...props }) => {
  const Component = require(`./${variant}.svg`).default
  return <Component {...props} />
}

export default Icon
