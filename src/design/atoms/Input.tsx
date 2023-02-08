import { styled, theme } from '@src/design/theme/stitches.config';

export const Input = styled('input', {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: theme.colors.blue11,
  boxShadow: `0 0 0 1px ${theme.colors.blue8}`,
  height: 35,

  '&:focus': { boxShadow: `0 0 0 2px ${theme.colors.blue7}` },
});
