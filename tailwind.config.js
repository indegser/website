const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      gray: colors.gray,
      blue: colors.blue,
      backdrop: 'rgba(255, 255, 255, 0.85)',
    },
    extend: {
      fontFamily: {
        sans: 'var(--pretendard), -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Roboto", "Apple SD Gothic Neo", "Noto Sans KR"',
        mono: 'var(--jetbrains-mono), "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
      },
    },
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
};