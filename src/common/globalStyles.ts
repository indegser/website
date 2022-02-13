import { globalCss, theme } from "./stitches.config";

export const globalStyles = globalCss({
  ["@import"]: [
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css",
    "https://rsms.me/inter/inter.css",
  ],
  ["a"]: {
    textDecoration: "none",
    font: "inherit",
    color: "inherit",
  },
  ["html"]: {
    fontFamily: theme.fonts.sans,
    fontSize: 16,
    "-ms-text-size-adjust": "100%",
    "-webkit-text-size-adjust": "100%",
    "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)",
  },
  ["body"]: {
    margin: 0,
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    fontKerning: "normal",
    fontFeatureSettings: '"kern", "liga", "clig", "calt"',
    color: theme.colors.fgDefault,
  },
});
