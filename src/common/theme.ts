import {
  AdaptiveTheme,
  generateAdaptiveTheme,
  NamedColorScale,
} from "@adobe/leonardo-contrast-colors";

const media = {
  sm: 450,
  md: 768,
  lg: 1170,
  xl: 1440,
};

export const mq = (key: keyof typeof media | number) => {
  let px: number;
  if (typeof key === "number") {
    px = key;
  } else {
    px = media[key];
    if (!px) {
      throw new Error(`Cannot find media query with key ${key}`);
    }
  }
  return `@media (max-width: ${px}px)`;
};

const palette: NamedColorScale[] = [
  {
    name: "text",
    colorKeys: ["#2a2c2f"],
    colorspace: "RGB",
    ratios: {
      textMarkdownBlack: 18,
      textMarqueeTitle: 20,
      textMarqueeLabel: 9,
      textFigcaption: 9,
      textBlack: 12,
      textGrey: 8,
      textLightGrey: 4.6,
    },
  },
  {
    name: "bg",
    colorKeys: ["#2a2c2f"],
    colorspace: "RGB",
    ratios: {
      bgPaper: 1,
      bgCode: 1.15,
      bgDivider: 1.3,
    },
  },
  {
    name: "primary",
    colorKeys: ["#0088ff"],
    colorspace: "RGB",
    ratios: {
      linkPrimary: 4.6,
      linkPrimaryHover: 6,
    },
  },
];

const adaptiveTheme = generateAdaptiveTheme({
  colorScales: palette,
  baseScale: "bg",
});

const createThemeVariables = (...args: Parameters<AdaptiveTheme>) => {
  const rules = adaptiveTheme(...args);
  const res = [];
  for (const rule of rules) {
    if ("values" in rule) {
      for (const v of rule.values) {
        const { name, value } = v;
        res.push([`--${name}`, value]);
      }
    }
  }

  return res;
};

export const themes = {
  light: createThemeVariables(99, 1),
  dark: createThemeVariables(12, 1),
};

type KeysOfUnion<T> = T extends any ? keyof T : never;
type Variables = KeysOfUnion<typeof palette[number]["ratios"]>;

export const COLORS = palette.reduce((res, scale) => {
  const { ratios } = scale;
  const ratioKeys = Object.keys(ratios);

  for (const ratioKey of ratioKeys) {
    res[ratioKey] = `var(--${ratioKey})`;
  }

  return res;
}, {} as { [key in Variables]: string });
