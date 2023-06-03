import { RichText } from '@src/design/notion/RichText';
import { BlockType } from '@src/types/notion';

interface Props {
  block: Extract<BlockType, { type: 'quote' }>;
}

export const QuoteBlock = ({ block }: Props) => {
  return (
    <div className="mt-1">
      <div className="flex p-1">
        <div className="border-l-2 border-b-gray-800 pl-4">
          <RichText data={block.quote.rich_text} />
        </div>
      </div>
    </div>
  );
};
