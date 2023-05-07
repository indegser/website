import styled from '@emotion/styled';

import { PageContent } from '@src/design/atoms/Container';
import { theme } from '@src/design/theme/stitches.config';

export const DividerBlock = () => {
  return (
    <PageContent>
      <Divider />
    </PageContent>
  );
};

const Divider = styled.div`
  height: 1px;
  border-bottom: 1px solid ${theme.colors.gray5.computedValue};
`;
