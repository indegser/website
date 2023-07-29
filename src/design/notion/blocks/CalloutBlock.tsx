import { NotionIcon } from './NotionIcon';

import { PageContent } from '@src/design/atoms/Container';
import { convertApiColorToStyleProps } from '@src/design/notion/convertApiColorToStyleProps';
import { RichText } from '@src/design/notion/RichText';
import { BlockType } from '@src/types/notion.types';

interface Props {
  block: Extract<BlockType, { type: 'callout' }>;
}

export const CalloutBlock = ({ block }: Props) => {
  const { icon, color, rich_text } = block.callout;
  const style = convertApiColorToStyleProps(color);

  return (
    <PageContent>
      <div className="flex rounded-s p-4 pl-3" style={style}>
        <div>
          <NotionIcon icon={icon} />
        </div>
        <div style={{ marginLeft: 8 }}>
          <RichText data={rich_text} />
        </div>
      </div>
    </PageContent>
  );
};
