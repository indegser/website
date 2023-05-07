import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import { theme } from '@src/design/theme';

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

const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${theme.colors.blue11.computedValue};

  & hover {
    text-decoration: underline;
  }
`;
