import { Global, css } from '@emotion/core'
import { generateAdaptiveTheme } from '@adobe/leonardo-contrast-colors'
import { useThemeStore } from 'common/organs/footer/theme/Theme.hooks'
import { useMemo } from 'react'

const styles = css`
  :root {
    --font-sans: Roboto, Segoe UI, Noto Sans KR, sans-serif;
    --font-serif: Lusitana, Nanum Myeongjo, Georgia, Cambria, 'Times New Roman',
      Times, Noto Serif KR, serif;
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
    font-size: 0.925rem;
    padding: 6px 12px;
    border-radius: 4px;
    outline: 0;
    letter-spacing: 0.4px;
    width: 100%;
    box-sizing: border-box;
    display: block;

    &:active,
    &:focus {
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
    font-size: 13px;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
      monospace;
  }

  label[for] {
    font-size: 13px;
    font-weight: 500;
    vertical-align: bottom;
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

const COLORSPACE = 'CAM02'

const palette = {
  colorScales: [
    {
      name: 'text',
      colorKeys: ['#cacaca'],
      colorspace: COLORSPACE,
      ratios: [2, 4.6, 7, 12],
    },
    {
      name: 'border',
      colorKeys: ['#cacaca'],
      ratios: [1.3],
    },
    {
      name: 'primary',
      colorKeys: ['#0088ff'],
      colorspace: COLORSPACE,
      ratios: [4.6],
    },
  ],
  baseScale: 'text',
}

const generator = generateAdaptiveTheme(palette)

const GlobalStyle = () => {
  const scheme = useThemeStore((s) => s.scheme)

  const theme = useMemo(() => {
    const isLight = scheme === 'light'
    const cssVars = {}
    const [{ background }, ...rules] = generator(isLight ? 99 : 12)
    cssVars[`--background`] = background
    for (const rule of rules) {
      for (const color of rule.values) {
        const { name, value } = color
        cssVars[`--${name}`] = value
      }
    }
    return cssVars
  }, [scheme])

  return (
    <>
      <Global
        styles={{
          ':root': theme,
        }}
      />
      <Global styles={styles} />
    </>
  )
}

export default GlobalStyle
