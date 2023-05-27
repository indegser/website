const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      gray: colors.gray,
      blue: colors.blue,
      backdrop: 'rgba(255, 255, 255, 0.85)',
    },
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
};
