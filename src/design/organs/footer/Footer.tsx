import styled from '@emotion/styled';

import { Sns } from './Sns';

import { PageContainer } from '@src/design/atoms/Container';
import { mq } from '@src/design/mediaQueries';
import { theme } from '@src/design/theme';

export const Footer = () => {
  return (
    <FooterBox>
      <PageContainer>
        <Layout>
          <Name>Indegser. Designer at Seoul, South Korea.</Name>
          <Sns />
        </Layout>
      </PageContainer>
    </FooterBox>
  );
};

const FooterBox = styled.footer`
  margin-top: 32px;
  padding: 16px 0 48px 0;
`;

const Layout = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  gap: 0 20px;
  align-items: center;
  grid-template-areas: 'name sns';

  ${mq('md')} {
    gap: 12px 0;
    justify-content: center;
    grid-template-areas: 'sns name';
  }
`;

const Name = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${theme.colors.gray10.computedValue};
  grid-area: name;
`;
