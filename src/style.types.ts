export type ThemeType = "light" | "dark";

const createSchemePalette = (
  schemeName: keyof typeof scheme,
  ...colorKeys: string[]
) => {
  const ratios = [
    [50, 1.05],
    [100, 1.3],
    [200, 1.6],
    [300, 2.3],
    [400, 3.5],
    [500, 4.5],
    [600, 5.8],
    [700, 6.4],
    [800, 12],
    [900, 18],
  ] as const;
  return {
    colorKeys,
    ratios: ratios.reduce((res, item) => {
      res[`${schemeName}${item[0]}`] = item[1];
      return res;
    }, {} as Record<`${typeof schemeName}${typeof ratios[number][0]}`, number>),
  };
};

const scheme = {
  // gray: "#6B7280",
  gray: "#71717A",
  // trueGray: "#737373",
  red: "#EF4444",
  // orange: "#F97316",
  // amber: "#F59E0B",
  // yellow: "#EAB308",
  // lime: "#84CC16",
  green: "#22C55E",
  // emerald: "#10B981",
  // teal: "#14B8A6",
  // cyan: "#06B6D4",
  // sky: "#0EA5E9",
  blue: "#3B82F6",
  // indigo: "#6366F1",
  // violet: "#8B5CF6",
  // purple: "#A855F7",
  // fuchsia: "#D946EF",
  // pink: "#EC4899",
  // rose: "#F43F5E",
} as const;

export const palette = {
  ...Object.keys(scheme).reduce((res, schemeName) => {
    const data = createSchemePalette(
      schemeName as keyof typeof scheme,
      scheme[schemeName]
    );
    res[schemeName] = data;
    return res;
  }, {} as Record<keyof typeof scheme, ReturnType<typeof createSchemePalette>>),
  text: {
    colorKeys: ["#2a2c2f"],
    ratios: {
      textMarkdownBlack: 12,
      textMarqueeTitle: 20,
      textMarqueeLabel: 9,
      textFigcaption: 9,
      textBlack: 12,
      textGrey: 8,
      textResume: 10,
      textLiDot: 3,
      textLightGrey: 4.6,
      textTitle: 20,
    },
  },
  bg: {
    colorKeys: ["#2a2c2f"],
    ratios: {
      bgPaper: 1,
      bgCode: 1.02,
      bgDivider: 1.3,
      bgIconHover: 1.12,
    },
  },
  primary: {
    colorKeys: ["#0088ff"],
    ratios: {
      linkPrimary: 4.6,
      linkPrimaryHover: 6,
    },
  },
} as const;

export const colors = Object.keys(palette).reduce((res, paletteKey) => {
  const { ratios } = palette[paletteKey];
  const ratioKeys = Object.keys(ratios);

  for (const ratioKey of ratioKeys) {
    res[ratioKey] = `var(--${ratioKey})`;
  }

  return res;
}, {} as { [key in ColorType]: string });

type PaletteType = keyof typeof palette;
type KeysOfUnion<T> = T extends any ? keyof T : never;
export type ColorType = KeysOfUnion<typeof palette[PaletteType]["ratios"]>;
