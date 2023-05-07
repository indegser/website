import { theme } from '@src/design/theme';
import { AnnotationColorType } from '@src/types/notion';

export const convertApiColorToStyleProps = (color: AnnotationColorType) => {
  if (!color || color === 'default') return {};

  const isBackground = color.includes('_background');
  const colorValue = isBackground
    ? color.replace('_background', '3')
    : `${color}11`;
  const colorKey = isBackground ? 'background' : 'color';

  return { [colorKey]: theme.colors[colorValue] };
};
