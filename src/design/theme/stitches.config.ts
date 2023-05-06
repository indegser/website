import {
  gray,
  blue,
  red,
  green,
  purple,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  purpleDark,
  limeDark,
  lime,
  crimsonDark,
  crimson,
} from '@radix-ui/colors';
import { createStitches } from '@stitches/react';
import localFont from 'next/font/local';

// Font files can be colocated inside of `pages`
const font = localFont({ src: './PretendardVariable.woff2' });

export const {
  styled: legacy,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      gray400: 'gainsboro',
      gray500: 'lightgray',
      fgDefault: '#24292f',
      fgMuted: '#57606a',
      fgSubtle: '#6e7781',
      canvasInset: '#f6f8fa',
      canvasSubtle: '#f6f8fa',
      borderDefault: '#d0d7de',
      borderMuted: 'hsla(210,18%,87%,1)',
      borderSubtle: 'rgba(27,31,36,0.1)',
      accentFg: '#0969da',
      accentMuted: 'rgba(84,174,255,0.4)',
      accentSubtle: '#ddf4ff',
      linkDefault: '#737371',
      backdrop: 'rgba(255, 255, 255, 0.85)',
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...purple,
      ...lime,
      ...crimson,
      codeString: green.green10,
    },
    fonts: {
      sans: `${font.style.fontFamily}, --apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Apple SD Gothic Neo", "Noto Sans KR"`,
      mono: `'JetBrains Mono', "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace`,
    },
  },
});

export const darkTheme = createTheme('dark', {
  colors: {
    backdrop: 'rgba(0, 0, 0, 0.65)',
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...limeDark,
    ...purpleDark,
    ...crimsonDark,
    codeString: limeDark.lime9,
  },
});
