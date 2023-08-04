import { RichText } from '@src/components/notion/RichText';
import { BlockType } from '@src/types/notion.types';

interface Props {
  marker: number;
  depth: number;
  block: Extract<BlockType, { type: 'numbered_list_item' }>;
}

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

function counterGenerator(type: number, marker: number) {
  switch (type) {
    case 0: {
      return marker + 1;
    }
    case 1: {
      return alphabet[marker % alphabet.length];
    }
    default: {
      return;
    }
  }
}

export const NumberedListItemBlock = ({ block, depth, marker }: Props) => {
  const { numbered_list_item } = block;

  return (
    <div className="flex w-full items-start pl-0.5">
      <div className="mr-0.5 flex h-6 w-6 items-center justify-center text-lg leading-6">
        {counterGenerator(depth % 2, marker)}.
      </div>
      <div className="flex flex-1 flex-col">
        <RichText data={numbered_list_item.rich_text} />
      </div>
    </div>
  );
};
