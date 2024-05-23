import { Block } from './blocks/Block';

import { notionApi } from '@/lib/supabase/notion.api';

interface Props {
  id: string;
}

export const NotionContent = async ({ id }: Props) => {
  const blocks = await notionApi.retrieveBlockChildren(id);

  return (
    <article className="text-[17px] font-[420] leading-relaxed text-gray-800 dark:text-gray-100 dark:text-opacity-70">
      {blocks.map((block, index) => {
        return (
          <Block key={block.id} block={block} index={index} blocks={blocks} />
        );
      })}
    </article>
  );
};
