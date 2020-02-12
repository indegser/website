export enum BackgroundColorTypes {}

export enum ColorTokens {
  Interactive1 = '#0f62fe',
  Danger = '#da1e28',
}

const reverseMap = Object.keys(ColorTokens).reduce((res, key) => {
  const value = ColorTokens[key]
  res[value] = key
  return res
}, {})

export const getColor = (variant: ColorTokens) => {
  return `var(--${reverseMap[variant].toLowerCase()})`
}
