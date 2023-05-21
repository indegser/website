import {
  gray,
  blue,
  red,
  green,
  purple,
  lime,
  crimson,
} from '@radix-ui/colors';
import localFont from 'next/font/local';

// Font files can be colocated inside of `pages`
export const font = localFont({
  src: '../../assets/PretendardVariable.woff2',
  style: 'normal',
  weight: '100 800',
});

const config = {
  colors: {
    body: gray.gray12,
    bgBody: gray.gray1,
    gray400: 'gainsboro',
    gray500: 'lightgray',
    fgDefault: '#24292f',
    fgMuted: '#57606a',
    fgSubtle: '#6e7781',
    canvasInset: '#f6f8fa',
    canvasSubtle: '#f6f8fa',
    borderDefault: '#d0d7de',
    borderMuted: 'hsla(210,18%,87%,1)',
    borderSubtle: 'rgba(27,31,36,0.1)',
    accentFg: '#0969da',
    accentMuted: 'rgba(84,174,255,0.4)',
    accentSubtle: '#ddf4ff',
    linkDefault: '#737371',
    backdrop: 'rgba(255, 255, 255, 0.85)',
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...purple,
    ...lime,
    ...crimson,
    codeString: green.green10,
  },
  fonts: {
    sans: `${font.style.fontFamily}, -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Roboto", "Apple SD Gothic Neo", "Noto Sans KR"`,
    mono: `'JetBrains Mono', "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace`,
  },
};

const createTheme = () => {
  const theme = {} as {
    colors: Record<keyof (typeof config)['colors'], { computedValue: string }>;
    fonts: Record<keyof (typeof config)['fonts'], { computedValue: string }>;
  };

  let cssText = '';

  for (const configKey in config) {
    const subConfig = config[configKey];
    for (const key in subConfig) {
      const value = subConfig[key];

      if (!theme[configKey]) {
        theme[configKey] = {};
      }

      const variableName = `--${configKey}-${key}`;
      theme[configKey][key] = { computedValue: `var(${variableName})` };
      cssText += `${variableName}: ${value};`;
    }
  }

  return {
    theme,
    cssText,
  };
};

export const { theme, cssText } = createTheme();
