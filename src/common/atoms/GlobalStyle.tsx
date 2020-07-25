import { Global, css } from "@emotion/core";

const styles = css`
  :root {
    --font-sans: Roboto, Segoe UI, Noto Sans KR, sans-serif;
    --font-serif: Noto Serif KR, Nanum Myeongjo, Georgia, Cambria,
      "Times New Roman", Times, serif;
  }

  html {
    font-family: var(--font-sans);
    background: var(--background);
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
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
    color: var(--text400);

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
      border-color: var(--interactive1);
      background: white !important;
    }

    &:hover {
      background: #ebedf1;
    }
  }

  code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    font-size: 14px;
    white-space: pre;
    padding: 0 2px;
  }

  textarea {
    font-size: 0.925rem;
    resize: vertical;
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
`;

const GlobalStyle = () => {
  return (
    <>
      <Global styles={styles} />
    </>
  );
};

export default GlobalStyle;
