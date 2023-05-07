export const breakPoints = {
  sm: 450,
  md: 768,
  lg: 1080,
  xl: 1440,
};

export const mq = (key: keyof typeof breakPoints | number) => {
  let px: number;
  if (typeof key === 'number') {
    px = key;
  } else {
    px = breakPoints[key];
    if (!px) {
      throw new Error(`Cannot find media query with key ${key}`);
    }
  }
  return `@media (max-width: ${px}px)`;
};

export const mediaQueries = {
  hoverable: '@media(hover: hover) and (pointer: fine)',
};
