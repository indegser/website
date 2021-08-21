import { Global, css } from "@emotion/react";
import { mq } from "common/theme";
import { spacingVariables } from "common/variables";
import { colors } from "style.types";
import { themes } from "./ThemeScript";

const styles = css`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css");

  :root {
    --font-sans: "Pretendard Variable", --apple-system, BlinkMacSystemFont,
      "Segoe UI", "Roboto", "Apple SD Gothic Neo", "Noto Sans KR",
      "Malgun Gothic", sans-serif;
    --font-serif: IBM Plex Serif, Noto Serif KR, Nanum Myeongjo, Georgia,
      Cambria, "Times New Roman", Times, serif;
    --font-mono: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;

    ${spacingVariables.pagePadding}: 48px;

    ${mq(840)} {
      ${spacingVariables.pagePadding}: 32px;
    }

    ${mq(640)} {
      ${spacingVariables.pagePadding}: 20px;
    }
  }

  html[data-theme="light"] {
    ${themes.light.map(
      (rule) => css`
        ${rule[0]}: ${rule[1]}
      `
    )}
  }

  html[data-theme="dark"] {
    ${themes.dark.map(
      (rule) => css`
        ${rule[0]}: ${rule[1]}
      `
    )}
  }

  html {
    font-family: var(--font-sans);
    background: ${colors.bgPaper};
    font-size: 16px;
    overflow-y: scroll;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
    color: ${colors.textBlack};

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
    line-height: 1.6rem;
    font-size: 1rem;
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
      background: white !important;
    }

    &:hover {
      background: #ebedf1;
    }
  }

  code {
    font-family: var(--font-mono);
    white-space: pre;
    overflow-wrap: normal;
    font-feature-settings: normal;
    -webkit-font-smoothing: normal;
  }

  textarea {
    font-size: 0.925rem;
    resize: vertical;
    font-family: var(--font-mono);
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
`;

const GlobalStyle = () => {
  return <Global styles={styles} />;
};

export default GlobalStyle;
