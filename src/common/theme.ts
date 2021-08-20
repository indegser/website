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

export const mediaQueries = {
  hoverable: "@media(hover: hover) and (pointer: fine)",
};
