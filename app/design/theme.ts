import { generateMedia } from 'styled-media-query'

const breakpoints = {
  small: '450px',
  medium: '768px',
  large: '1170px',
  huge: '1440px',
}

const media = generateMedia(breakpoints)

export default {
  breakpoints: Object.keys(breakpoints).map(b => breakpoints[b]),
  media,
}
