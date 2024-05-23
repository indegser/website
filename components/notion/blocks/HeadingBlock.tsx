import { RichTextItemResponse } from '@/lib/notion/notion.types';
import { RichText } from 'components/notion/RichText';

interface Props {
  level: 1 | 2 | 3;
  heading: {
    rich_text: RichTextItemResponse;
    color: any;
  };
}

export const HeadingBlock = ({ level, heading }: Props) => {
  const map = {
    1: 'text-xl',
    2: 'text-lg',
    3: 'text-lg',
  };
  return (
    <div className={`mb-0 font-semibold ${map[level]}`} data-level={level}>
      <RichText data={heading.rich_text} />
    </div>
  );
};
