export enum ColorTokens {
  Interactive1 = '#0f62fe',
  Danger = '#da1e28',
  BorderLighter = '#ebebeb',
}

export const colorTokens = {
  attr: '#585c6d',
  borderLighter: '#ebebeb',
}

export type ColorTokenType = keyof typeof colorTokens

export const getColor = (variant: ColorTokenType) => {
  return `var(--${variant})`
}
