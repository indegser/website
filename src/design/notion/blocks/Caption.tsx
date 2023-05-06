import styled from '@emotion/styled';
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

import { RichText } from '@src/design/notion/RichText';
import { theme } from '@src/design/theme/stitches.config';

interface Props {
  caption: RichTextItemResponse[];
}

export const Caption = ({ caption }: Props) => {
  return (
    <Container>
      <RichText data={caption} />
    </Container>
  );
};

const Container = styled.div`
  font-size: 12px;
  letter-spacing: 0;
  line-height: 16px;
  font-weight: 500;
  color: ${theme.colors.gray10.computedValue};
  margin-top: 14px;
`;
