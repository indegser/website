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
    <article className="text-lg text-gray-700 dark:text-gray-100 dark:text-opacity-60 md:text-base">
      {blocks.map((block, index) => {
        return (
          <Block key={block.id} block={block} index={index} blocks={blocks} />
        );
      })}
    </article>
  );
};
