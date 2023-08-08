import { Block } from './blocks/Block';

import { pageApi } from '@src/apis/page.api';
import { BlockType } from '@src/types/notion.types';

interface Props {
  id: string;
}

export const NotionContent = async ({ id }: Props) => {
  const { content } = await pageApi.getPage(id);
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
