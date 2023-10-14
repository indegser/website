/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['media'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: 'var(--pretendard), -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Roboto", "Apple SD Gothic Neo", "Noto Sans KR"',
        mono: 'var(--jetbrains-mono), "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
        emoji:
          "'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Noto Color Emoji', 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols'",
      },
      colors: {
        backdrop: 'rgba(255, 255, 255, 0.85)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
