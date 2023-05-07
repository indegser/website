import styled from '@emotion/styled';
import Link from 'next/link';

import { Logo } from './Logo';

import { PageContainer } from '@src/design/atoms/Container';
import { theme } from '@src/design/theme';

export const Nav = () => {
  return (
    <Backdrop>
      <PageContainer>
        <Layout>
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

const Backdrop = styled.div`
  position: sticky;
  top: 0;
  backdrop-filter: blur(12px);
  z-index: 1;
  background-color: ${theme.colors.backdrop.computedValue};
`;

const Layout = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0px 2px 0px;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px 0 0;
  height: 45px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: ${theme.colors.gray12.computedValue};
`;
