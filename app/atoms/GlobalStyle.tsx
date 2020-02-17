import { createGlobalStyle, css } from 'styled-components'
import { colorTokens } from './colors/colorTypes'

const colorVars = () => {
  const keys = Object.keys(colorTokens)
  const values = keys.map(key => colorTokens[key])

  let rules = ''
  for (const [i, key] of keys.entries()) {
    const value = values[i]
    rules += `--${key}: ${value};`
  }

  return css`
    ${rules}
  `
}

const GlobalStyle = createGlobalStyle`
  :root {
    --font-sans: system-ui, -apple-system, BlinkMacSystemFont, Roboto,
      Segoe UI, Ubuntu, 'Helvetica Neue', sans-serif;
    ${colorVars};
  }

  html {
    font-family: var(--font-sans);
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-kerning: normal;
    -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    font-feature-settings: 'kern', 'liga', 'clig', 'calt';

    &.prevent-scroll {
      position: fixed;
      width: 100vw;
    }
  }

  input,
  textarea {
    font: inherit;
  }

  .fixed {
    overflow: hidden;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    bottom: 0;
    right: 0;
  }
`

export default GlobalStyle
