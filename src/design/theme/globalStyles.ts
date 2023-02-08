import { globalCss, theme } from './stitches.config';

export const globalStyles = globalCss({
  ['@import']: [
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable.css',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap',
  ],
  ['a']: {
    textDecoration: 'none',
    fontFamily: theme.fonts.sans,
    color: 'inherit',
  },
  ['html']: {
    fontFamily: theme.fonts.sans,
    fontSize: 16,
    '-ms-text-size-adjust': '100%',
    '-webkit-text-size-adjust': '100%',
    '-webkit-tap-highlight-color': 'rgba(255, 255, 255, 0)',
    background: theme.colors.gray1,
  },
  ['body']: {
    margin: 0,
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    fontKerning: 'normal',
    fontFeatureSettings: '"kern", "liga", "clig", "calt"',
    color: theme.colors.gray12,
  },
  [':focus-visible']: {
    outline: `none`,
  },
  ["div[type='button']"]: {
    cursor: 'pointer',
    borderRadius: 4,
    ['&:hover']: {
      background: theme.colors.gray3,
    },
  },
});
