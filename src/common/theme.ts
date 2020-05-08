import { generateMedia } from 'styled-media-query'

const breakpoints = {
  small: '450px',
  medium: '768px',
  large: '1170px',
  huge: '1440px',
}

const media = {
  sm: 450,
  md: 768,
  lg: 1170,
  xl: 1440,
}

export const mediaQuery = generateMedia(breakpoints)

export const mq = (key: keyof typeof media | number) => {
  let px: number
  if (typeof key === 'number') {
    px = key
  } else {
    px = media[key]
    if (!px) {
      throw new Error(`Cannot find media query with key ${key}`)
    }
  }
  return `@media (max-width: ${px}px)`
}

export default {
  breakpoints: Object.keys(breakpoints).map((b) => breakpoints[b]),
  media: mediaQuery,
}
