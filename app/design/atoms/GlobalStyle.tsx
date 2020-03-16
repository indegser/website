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
    --font-sans: Roboto, Noto Sans KR, Segoe UI, Ubuntu, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
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

  a {
    text-decoration: none;
    font: inherit;
    color: inherit;
  }

  input,
  textarea {
    font: inherit;
    margin: 0;
    border: 0;
    border: 1px solid #dcdee0;
    background: #f0f4fb;
    line-height: 1.5rem;
    font-size: .925rem;
    padding: 6px 12px;
    border-radius: 4px;
    outline: 0;
    letter-spacing: .4px;
    width: 100%;
    box-sizing: border-box;
    display: block;

    &:active, &:focus {
      box-shadow: 0 0 2px 3px #dbe7f9;
      border-color: var(--interactive1);
      background: white !important;
    }

    &:hover {
      background: #ebedf1;
    }
  }

  textarea {
    resize: vertical;
  }

  label {
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
