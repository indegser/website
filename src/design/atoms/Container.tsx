import styled from '@emotion/styled';

export const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 980px;
  padding: 0 22px;
  position: relative;
  box-sizing: content-box;
  padding-left: max(22px, env(safe-area-inset-left));
  padding-right: max(22px, env(safe-area-inset-right));
`;

export const PageContent = styled.div`
  max-width: 653px;
  margin: 0 auto;
  box-sizing: border-box;
`;
