export const palette = {
  text: {
    colorKeys: ["#2a2c2f"],
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
  bg: {
    colorKeys: ["#2a2c2f"],
    ratios: {
      bgPaper: 1,
      bgCode: 1.15,
      bgDivider: 1.3,
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
