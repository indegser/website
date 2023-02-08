import { PropsWithChildren } from 'react';

import { styled, theme } from '@src/design/theme/stitches.config';

interface Props {
  link: { url: string } | null;
}

export const RichTextWithLink = ({
  link,
  children,
}: PropsWithChildren<Props>) => {
  if (link === null) {
    return <>{children}</>;
  }

  return <Link href={link.url}>{children}</Link>;
};

const Link = styled('a', {
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.colors.blue11,

  ['&:hover']: {
    textDecoration: 'underline',
  },
});
