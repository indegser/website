import theme from 'tailwindcss/defaultTheme';
import resolveConfig from 'tailwindcss/resolveConfig';
import baseConfig from '../tailwind.config.js';

export const styleConfig = resolveConfig(baseConfig);
export const tailwindTheme = theme;
