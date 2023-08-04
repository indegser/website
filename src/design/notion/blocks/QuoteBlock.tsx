import { RichText } from '@src/design/notion/RichText';
import { BlockType } from '@src/types/notion.types';

interface Props {
  block: Extract<BlockType, { type: 'quote' }>;
}

export const QuoteBlock = ({ block }: Props) => {
  return (
    <div className="mt-1">
      <div className="flex p-1">
        <div className="border-l-2 border-l-gray-400 pl-4 dark:border-l-gray-600">
          <RichText data={block.quote.rich_text} />
        </div>
      </div>
    </div>
  );
};
