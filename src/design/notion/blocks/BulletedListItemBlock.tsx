import { RichText } from '@src/design/notion/RichText';
import { BlockType } from '@src/types/notion';

interface Props {
  depth: number;
  block: Extract<BlockType, { type: 'bulleted_list_item' }>;
}

const bullets = ['•', '◦', '▪'];
export const BulletedListItemBlock = ({ depth, block }: Props) => {
  const { bulleted_list_item } = block;

  return (
    <div className="flex w-full items-start pl-0.5">
      <div className="mr-0.5 flex h-6 w-6 items-center justify-center text-lg leading-6">
        {bullets[depth % 3]}
      </div>
      <div className="flex flex-1 flex-col">
        <RichText data={bulleted_list_item.rich_text} />
      </div>
    </div>
  );
};
