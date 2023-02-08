import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

import { RichText } from '@src/design/notion/RichText';
import { styled, theme } from '@src/design/theme/stitches.config';

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

const Container = styled('div', {
  fontSize: 12,
  letterSpacing: 0,
  lineHeight: '16px',
  fontWeight: 500,
  color: theme.colors.gray10,
  marginTop: 14,
});
