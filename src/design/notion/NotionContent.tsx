import { Block } from './blocks/Block';

import { pageApi } from '@src/apis/content';

interface Props {
  id: string;
}

export const NotionContent = async ({ id }: Props) => {
  const { content } = await pageApi.getPage(id);

  return (
    <article className="text-lg md:text-base">
      {content.map((block, index) => {
        return (
          <Block key={block.id} block={block} index={index} blocks={content} />
        );
      })}
    </article>
  );
};
