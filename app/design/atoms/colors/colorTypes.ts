import { darken, lighten, shade, tint } from 'polished'

export const colorTokens = {
  attr: '#585c6d',
  borderLighter: '#ebebeb',
  interactive1: '#0f62fe',
  bgSilver: '#ddd',
  textLinkColor: '#225ad2',
  textPrimary: shade(0.75, '#225ad2'),
  bodyTextPrimary: tint(0.3, shade(0.8, '#225ad2')),
  textLabelColor: tint(0.3, shade(0.6, '#225ad2')),
  bodyTextComment: '#bb8e49',
  get baseButtonPrimary() {
    return this.interactive1
  },
  get baseButtonBg() {
    return this.bgSilver
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
