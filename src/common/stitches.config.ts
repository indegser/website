import { createStitches } from "@stitches/react";

export const {
  styled,
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
      gray400: "gainsboro",
      gray500: "lightgray",
    },
    fonts: {
      sans: '"Pretendard Variable", --apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Apple SD Gothic Neo", "Noto Sans KR"',
      mono: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
  },
  utils: {
    marginX: (value) => ({ marginLeft: value, marginRight: value }),
  },
});
