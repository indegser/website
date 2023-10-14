import { colors } from '../theme';

import { AnnotationColorType } from 'lib/supabase/notion.types';

export const convertApiColorToStyleProps = (color: AnnotationColorType) => {
  if (!color || color === 'default') return {};

  const isBackground = color.includes('_background');
  const colorValue = isBackground
    ? color.replace('_background', '3')
    : `${color}11`;
  const colorKey = isBackground ? 'background' : 'color';

  // @ts-ignore
  return { [colorKey]: colors[colorValue] };
};
