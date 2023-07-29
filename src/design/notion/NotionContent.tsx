import { Block } from './blocks/Block';

import { pageApi } from '@src/apis/content';
import { BlockType } from '@src/types/notion.types';

interface Props {
  id: string;
}

export const NotionContent = async ({ id }: Props) => {
  const { content } = await pageApi.getPage(id);
  const blocks = (Array.isArray(content) ? content : []) as BlockType[];

  return (
    <article className="text-lg md:text-base">
      {blocks.map((block, index) => {
        return (
          <Block key={block.id} block={block} index={index} blocks={blocks} />
        );
      })}
    </article>
  );
};
