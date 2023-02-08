import { NotionIcon } from './NotionIcon';

import { PageContent } from '@src/design/atoms/Container';
import { convertApiColorToStyleProps } from '@src/design/notion/convertApiColorToStyleProps';
import { RichText } from '@src/design/notion/RichText';
import { styled } from '@src/design/theme/stitches.config';
import { BlockType } from '@src/types/notion';

interface Props {
  block: Extract<BlockType, { type: 'callout' }>;
}

export const CalloutBlock = ({ block }: Props) => {
  const { icon, color, rich_text } = block.callout;
  const style = convertApiColorToStyleProps(color);

  return (
    <PageContent>
      <Container style={style}>
        <div>
          <NotionIcon icon={icon} />
        </div>
        <div style={{ marginLeft: 8 }}>
          <RichText data={rich_text} />
        </div>
      </Container>
    </PageContent>
  );
};

const Container = styled('div', {
  padding: 16,
  paddingLeft: 12,
  display: 'flex',
  borderRadius: 3,
});
