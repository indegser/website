import { darken, lighten } from 'polished'

export const colorTokens = {
  attr: '#585c6d',
  borderLighter: '#ebebeb',
  interactive1: '#0f62fe',
  bgSilver: '#ddd',
  get baseButtonBg() {
    return this.interactive1
  },
  get baseButtonBoxShadowUpper() {
    return lighten(0.2, this.baseButtonBg)
  },
  get baseButtonBoxShadowLower() {
    return darken(0.01, this.baseButtonBg)
  },
}

export type ColorTokenType = keyof typeof colorTokens

export const getColor = (variant: ColorTokenType) => {
  return `var(--${variant})`
}
