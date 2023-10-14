import { Block } from './blocks/Block';

import { BlockType } from 'lib/supabase/notion.types';
import { pageApi } from 'lib/supabase/page.api';

interface Props {
  id: string;
}

export const NotionContent = async ({ id }: Props) => {
  const { data, error } = await pageApi.getPage(id);
  if (error) return null;

  const { content } = data;
  const blocks = (Array.isArray(content) ? content : []) as BlockType[];

  return (
    <article className="text-[17px] font-[420] leading-relaxed text-gray-800 dark:text-gray-100 dark:text-opacity-60">
      {blocks.map((block, index) => {
        return (
          <Block key={block.id} block={block} index={index} blocks={blocks} />
        );
      })}
    </article>
  );
};
