export const colorTokens = {
  attr: '#585c6d',
  borderLighter: '#ebebeb',
  interactive1: '#0f62fe',
}

export type ColorTokenType = keyof typeof colorTokens

export const getColor = (variant: ColorTokenType) => {
  return `var(--${variant})`
}
