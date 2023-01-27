import { Inter } from "@next/font/google";
import {
  gray,
  blue,
  red,
  green,
  yellow,
  orange,
  purple,
  pink,
  brown,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  yellowDark,
  orangeDark,
  purpleDark,
  pinkDark,
  brownDark,
  limeDark,
  lime,
  crimsonDark,
  crimson,
  grayA,
  grayDarkA,
  blackA,
} from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

const inter = Inter({ subsets: ["latin"] });

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
      borderSubtle: "rgba(27,31,36,0.1)",
      accentFg: "#0969da",
      accentMuted: "rgba(84,174,255,0.4)",
      accentSubtle: "#ddf4ff",
      linkDefault: "#737371",
      backdrop: "rgba(255, 255, 255, 0.85)",
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...yellow,
      ...orange,
      ...purple,
      ...lime,
      ...pink,
      ...brown,
      ...crimson,
      popoverShadow: blackA.blackA5,
      codeString: green.green10,
    },
    fonts: {
      sans: `${inter.style.fontFamily}, "Pretendard Variable", --apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Apple SD Gothic Neo", "Noto Sans KR"`,
      mono: `'JetBrains Mono', "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace`,
    },
  },
});

export const darkTheme = createTheme("dark-theme", {
  colors: {
    backdrop: "rgba(0, 0, 0, 0.65)",
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...yellowDark,
    ...orangeDark,
    ...limeDark,
    ...purpleDark,
    ...pinkDark,
    ...brownDark,
    ...crimsonDark,
    codeString: limeDark.lime9,
  },
});
