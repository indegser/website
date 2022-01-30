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
      fgDefault: "#24292f",
      fgMuted: "#57606a",
      fgSubtle: "#6e7781",
      canvasInset: "#f6f8fa",
      canvasSubtle: "#f6f8fa",
      borderDefault: "#d0d7de",
      borderMuted: "hsla(210,18%,87%,1)",
      borderSubtle: "rgba(27,31,36,0.15)",
      accentFg: "#0969da",
      accentMuted: "rgba(84,174,255,0.4)",
      accentSubtle: "#ddf4ff",
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
