import Link from 'next/link';

import { Logo } from './Logo';

import { PageContainer } from '@src/design/atoms/Container';
import { styled, theme } from '@src/design/theme/stitches.config';

export const Nav = () => {
  return (
    <Backdrop>
      <PageContainer>
        <Layout id="global-nav">
          <Link href="/" passHref>
            <Heading>
              <Logo />
              Indegser
            </Heading>
          </Link>
        </Layout>
      </PageContainer>
    </Backdrop>
  );
};

const Backdrop = styled('div', {
  position: 'sticky',
  top: 0,
  backdropFilter: `blur(12px)`,
  backgroundColor: theme.colors.backdrop,
  zIndex: 1,
});

const Layout = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `4px 0px 2px 0px`,
});

const Heading = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px 0 0',
  height: 45,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  color: theme.colors.gray12,
});
